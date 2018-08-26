'use strict';
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'El usuario especificado ya está en uso.'
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },  
      unique: {
        msg: 'El email especificado ya esta en uso.'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
  }, {
    undescored: true,
    freezeTableName: true,
    tableName: 'users',

    hooks: {
      beforeCreate: (user, fields) => {
        return user.updatePassword();
      },
      beforeUpdate: (user, fields) => {
        if (user.changed('password')) {
          return user.updatePassword();
        }
        return null;
      },
    },
  });

  User.associate = function(models) {
    User.belongsToMany(models.Permission, {through: 'UserPermissions'});
  };

  User.encryptPassword = function(password){
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          resolve(hash);
        });
      });
    })    
  } 

  /**
   * Attaches the user object to the request if authenticated
   * Otherwise returns 403
   */
  User.isAuthenticated = function(){
    return compose()
      // Validate jwt
      .use((req, res, next) => {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = `Bearer ${req.query.access_token}`;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use((req, res, next) => {
        User
          .find({
            where: {
              id: req.user.id,
            },
          })
          .then((user) => {
            if (!user) {
              return res.status(401).end();
            }
            req.user = user;

            next();
            return null;
          })
          .catch(next);
      });
  }

  User.hasPermission = function(action, object) {
    if (!action || !object) {
      throw new Error('Required role needs to be set');
    }
    
    return compose()
    .use(User.isAuthenticated())
    .use((req, res, next) => {
      if (user.Permissions.has(action, object)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
  } 

  User.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password); 
  }

  User.prototype.updatePassword = function () {
    return new Promise((resolve, reject) => {
      // Handle new/update passwords
      if (this.password) {
        if (!this.password.length) {
          return reject(new Error('Invalid password'));
        }
        // Make salt
        var _this = this;
        User.encryptPassword(this.password)
          .then(function(hashedpassword){
            _this.password = hashedpassword;
            resolve(null);
          });
      } else {
        resolve();
      }
    })
  }

  User.prototype.hasPermission = function(action, resource){

  }

  return User;
};
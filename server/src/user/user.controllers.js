var path = require('path');
var User = require(path.join(__srcpath, 'modules', 'db')).User;
var Op = require('sequelize').Op;
var services = require('./user.services');
var responses = require(path.join(__srcpath, 'modules', 'utils','responses'));

/*
  FindAll
  Devuelve a todos los usuarios
*/
module.exports.findAll = function(req, res, next) {
  User
    .findAll({
      attributes: [
        'id',
        'username',
        'email',
      ],
    })
    .then(responses.handleEntityNotFound(res))
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
}

module.exports.sanitizate = function(req, res, next) {
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }
  next();
}

/*
  Save
  Guarda un usuario
*/
module.exports.save = function(req, res, next) {
  User.create({
  	username: req.body.username,
  	password: req.body.password,
    email: req.body.email
	}).then(function(user) {
    //Cuando todo sale bien 
    const token = services.signToken(user.id);
    res.json({token:token});
  
  }).catch(function(err) {
    //Se produjo un error
    res.send('error' + err);
  });
}


/*
  Login
  Autentica un usuario
*/
module.exports.login = function(req, res, next){
  User.findOne({
    where:{
      [Op.or]: {
        username: req.body.username,
        email: req.body.username 
      }
    }
  }).then(user => {
    if(user){
      if (user.verifyPassword(req.body.password)) {
        var token = services.signToken(user.id);
        res.json({token:token});
      } else {
        res.json({ message: 'La contraseña es incorrecta.'});
      }
    } else {
      res.json({ message: 'El usuario no existe'});
    }
  })
}

module.exports.findById = function(req, res, next){
  console.log('req.params.id: ' + req.params.id);

  const user_id = req.params.id;

  User.findOne({
    attributes: [
      'id',
      'username',
      'email'
    ],
    where:{
      id: user_id,
    }
  })
  .then(responses.handleEntityNotFound(res))
  .then(responses.responseWithResult(res))
  .catch(responses.handleError(res));
}

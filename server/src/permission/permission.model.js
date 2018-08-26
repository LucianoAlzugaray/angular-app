module.exports = (sequelize, DataTypes) => {
  var Permission = sequelize.define('Permission', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resource:{
      type: DataTypes.STRING,
      allowNull: false,
    } 
  }, {
    undescored: true,
    freezeTableName: true,
    tableName: 'permissions',
  });

  Permission.associate = function(models) {
    Permission.belongsToMany(models.User, {through: 'UserPermissions'});
  };

  return Permission;
};	
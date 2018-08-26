module.exports = (sequelize, DataTypes) => {
  var Rol = sequelize.define('Rol', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'El usuario especificado ya está en uso.'
      }
    }
  }, {
    undescored: true,
    freezeTableName: true,
    tableName: 'roles',
  });

  Rol.associate = function(models) {
    Rol.hasMany(models.User);
  };

  return Rol;
};	
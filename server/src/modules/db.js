/* Dynamic load of models in the project (<modelname>.model.js)*/
var fs = require('fs')
var path = require('path')
var classes = require('./classes');
var config = require(__srcpath + '/config/environment');
var Sequelize = require('sequelize');
var db = {};

var sequelize = new Sequelize(config.sequelize.makeUri(), {
    ...config.sequelize.options,
    operatorsAliases: Sequelize.Op,
});

for (var i = classes.length - 1; i >= 0; i--) {
  var filename = classes[i] + '.model.js'
  var model = sequelize['import'](path.join(__srcpath, classes[i], filename));
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
var classes = require('./classes');
var path = require('path');

module.exports = function(app) {
  for (var i = classes.length - 1; i >= 0; i--) {
    var Klass = require(path.join(__srcpath, classes[i]));
    app.use(Klass.api, Klass.router)
  }
}
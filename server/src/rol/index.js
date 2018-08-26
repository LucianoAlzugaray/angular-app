var model = require('./rol.model');
var router = require('./rol.router');

module.exports = {
  name: 'rol',
  api: '/rol',
  model: model, 
  router: router
}
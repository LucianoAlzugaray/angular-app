var model = require('./permission.model');
var router = require('./permission.router');

module.exports = {
  name: 'permission',
  api: '/permission',
  model: model, 
  router: router
}
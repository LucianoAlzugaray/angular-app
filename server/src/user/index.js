var model = require('./user.model.js');
var router = require('./user.router.js');
var auth = require('./user.services');

module.exports = {
  name: 'user',
  api: '/users',
  model: model, 
  router: router,
  auth: auth
}
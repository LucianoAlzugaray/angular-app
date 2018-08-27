var router = require('./user.router.js');
var auth = require('./user.services');

module.exports = {
  name: 'user',
  api: '/users',
  router: router,
  auth: auth
}
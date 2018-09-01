var router = require('./insurances.router.js');
var auth = require('./insurances.services');

module.exports = {
  name: 'insurances',
  api: '/insurances',
  router: router,
  auth: auth
}
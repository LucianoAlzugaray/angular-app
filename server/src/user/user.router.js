var express = require('express');
var path = require('path');
var router = express.Router();
var controllers = require('./user.controllers.js');
var userServices = require('./user.services');

router.post('/login', userServices.sanitizate, controllers.login);

/* Devolver todos los usuarios 
router.get('/', auth.isAuthenticated(), auth.hasPermission('read','usuarios'), controllers.findAll);
*/

module.exports = router;
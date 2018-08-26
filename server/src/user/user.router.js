var express = require('express');
var path = require('path');
var router = express.Router();
var controllers = require('./user.controllers.js')
var auth = require('./user.services');

router.post('/login', controllers.sanitizate, controllers.login);

/* Devolver todos los usuarios 
router.get('/', auth.isAuthenticated(), auth.hasPermission('read','usuarios'), controllers.findAll);

/* Ingresar con usuario y contraseña 
router.post('/login', controllers.sanitizate, controllers.login);
*/
module.exports = router;
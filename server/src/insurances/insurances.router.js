var express = require('express');
var path = require('path');
var router = express.Router();
var controllers = require('./insurances.controllers');
var userServices = require(__srcpath + '/user/user.services');

router.get('/', controllers.findAll )

module.exports = router;
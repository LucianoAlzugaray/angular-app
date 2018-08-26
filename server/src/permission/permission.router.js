var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require(path.join(__srcpath, 'user')).auth;

module.exports = router;
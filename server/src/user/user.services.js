var compose = require('composable-middleware');
var expressJwt = require('express-jwt');
var request = require('request');
const USER_DATA_URL = 'http://www.mocky.io/v2/5808862710000087232b75ac'
var jwt = require('jsonwebtoken')

var permissions = {
  'admin':{
    'read': ['clients','insurances']
  },
  'users':{
    'read': ['clients']
  }
}
/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

module.exports.sanitizate = function(req, res, next) {
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }
  next();
}


/**
 * Returns a jwt token signed by the app secret
 */
module.exports.signToken = function(user) {
  return jwt.sign({ user:user }, 'pipo', {
    expiresIn: 60 * 60 * 5,
  });
}

const validateJwt = expressJwt({
  secret:  'pipo',
});

const getAllUsers = function () {
  return new Promise(function (resolve, reject) {
    request(USER_DATA_URL, { json: true } ,(err, response, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body.clients)
      }
    });
  });
}

const findUser = (clients, username) => {
  for (client in clients) {
    if (clients[client].name.toLowerCase() == username || clients[client].email.toLowerCase() == username)
      return clients[client];
  }
  return null;
}

module.exports.getUser = function(username) {
  return new Promise( function(resolve, reject){ 
    getAllUsers().then(clients => {
      let user = findUser(clients, username); 
      if (user != null)
        resolve(user);
      else
        reject('No se encontro usuario');
    });
  }); 
}

const findUserById = (clients, id) => {
  for (client in clients) {
    if (clients[client].id == id)
      return clients[client];
  }
  return null;
}


module.exports.getUserById = function(id) {
  return new Promise( function(resolve, reject){ 
    getAllUsers().then(clients => {
      let user = findUserById(clients, id); 
      if (user != null)
        resolve(user);
      else
        reject('No se encontro usuario de id ' + id);
    });
  }); 
}

module.exports.getAll = function() {
  return getAllUsers();
}

module.exports.isAuthenticated = function(req, res, next) {
    /*
     * Check if authorization header is set
     */
    if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
        try {
            /*
             * Try to decode & verify the JWT token
             * The token contains user's id ( it can contain more informations )
             * and this is saved in req.user object
             */
            req.user = jwt.verify(req.headers['authorization'], 'pipo');
        } catch(err) {
            /*
             * If the authorization header is corrupted, it throws exception
             * So return 401 status code with JSON error message
             */
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!'
                }
            });
        }
    } else {
        /*
         * If there is no autorization header, return 401 status code with JSON
         * error message
         */
        return res.status(401).json({
            error: {
                msg: 'No token!'
            }
        });
    }
    next();
    return;
};


/**
 * Checks if the user role meets the minimum requirements of the route
 */
module.exports.hasPermission = function(action, resource) {
  if (!action || !resource)
    throw new Error('Action and resource needs to be set');
  
  return function (req, res, next) {
    if (permissions[req.user.role][action].indexOf(resource) != -1) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
} 

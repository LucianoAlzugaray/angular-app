var compose = require('composable-middleware');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var request = require('request');
const USER_DATA_URL = 'http://www.mocky.io/v2/5808862710000087232b75ac'

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

/**
 * Returns a jwt token signed by the app secret
 */
module.exports.signToken = function(id) {
  return jwt.sign({ id }, 'pipo', {
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

module.exports.getAll = function() {
  return getAllUsers();
}

module.exports.isAuthenticated = function() {
  return compose()
    // Validate jwt
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use((req, res, next) => {
      User
        .find({
          where: {
            id: req.user.id,
          },
        })
        .then((user) => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;

          next();
          return null;
        })
        .catch(next);
    });   
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
module.exports.hasPermission = function(action, resource) {
  if (!action || !resource) {
    throw new Error('Action and resource needs to be set');
  }
  return compose()
  .use(this.isAuthenticated())
  .use((req, res, next) => {
    if (req.user.hasPermission(action, resource)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  });
} 

var compose = require('composable-middleware');
var expressJwt = require('express-jwt');
var config = require(__srcpath + '/config/environment');
var jwt = require('jsonwebtoken');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */

/**
 * Returns a jwt token signed by the app secret
 */
module.exports.signToken = function(id) {
  return jwt.sign({ id }, config.secrets.session, {
    expiresIn: 60 * 60 * 5,
  });
}

const validateJwt = expressJwt({
  secret: config.secrets.session,
});

const getUsers = function() {
    
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

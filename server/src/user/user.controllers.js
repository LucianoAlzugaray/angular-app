var path = require('path');
var UserServices = require('./user.services');
var responses = require(path.join(__srcpath, 'modules', 'utils','responses'));


module.exports.sanitizate = function(req, res, next) {
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }
  next();
}


/*
  Login
  Autentica un usuario
*/
module.exports.login = function(req, res, next){
  username = req.body.username;
  password = req.body.password;
  UserServices.getUser(username).then( client => {
    
    res.json(client);
  }).catch(err => {
    console.log(err);
  });
  
}

/*
  FindAll
  Devuelve a todos los usuarios
*/
module.exports.findAll = function(req, res, next) {
  User
    .findAll({
      attributes: [
        'id',
        'username',
        'email',
      ],
    })
    .then(responses.handleEntityNotFound(res))
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
}

module.exports.findById = function(req, res, next){
  console.log('req.params.id: ' + req.params.id);

  const user_id = req.params.id;

  User.findOne({
    attributes: [
      'id',
      'username',
      'email'
    ],
    where:{
      id: user_id,
    }
  })
  .then(responses.handleEntityNotFound(res))
  .then(responses.responseWithResult(res))
  .catch(responses.handleError(res));
}

var path = require('path');
var Rol = require(path.join(__srcpath, 'modules', 'db')).Rol;
var responses = require(path.join(__srcpath, 'modules', 'utils','responses'));

module.exports.findAll = function(req, res, next) {
  Rol
    .findAll({
      attributes: [
        'id',
        'name'
      ],
    })
    .then(responses.handleEntityNotFound(res))
    .then(responses.responseWithResult(res))
    .catch(responses.handleError(res));
}

module.exports.sanitizate = function(req, res, next) {
  if (req.body.rolname) {
    req.body.rolname = req.body.rolname.toLowerCase();
  }
  next();
}

module.exports.save = function(req, res, next) {
  Rol.create({
    name: req.body.rolname
  }).then(function(rol) {
    //Cuando todo sale bien 
    res.json(rol);
  
  }).catch(function(err) {
    //Se produjo un error
    res.send('error' + err);
  });
}


module.exports.findByName = function(req, res, next){
  const rolname = req.params.name;

  Rol.findOne({
    attributes: [
      'id',
      'name'
    ],
    where:{
      name: rolname,
    }
  })
  .then(responses.handleEntityNotFound(res))
  .then(responses.responseWithResult(res))
  .catch(responses.handleError(res));
}


module.exports.delete = function(req, res, next) {
  console.log('despues lo hago')
  res.send('despues lo hago')
}

module.exports.update = function(req, res, next) {
  console.log('despues lo hago')
  res.send('despues lo hago')
}

module.exports.getPermissions = function(req, res, next) {
  console.log('despues lo hago')
  res.send('despues lo hago')
}

module.exports.addPermission = function(req, res, next) {
  console.log('despues lo hago')
  res.send('despues lo hago')
}

var express = require('express');
var router = express.Router();
var path = require('path');
var controllers = require('./rol.controllers');
var auth = require(path.join(__srcpath, 'user')).auth;

/* Devolver todos los roles */
router.get('/', auth.hasPermission('read','roles'), controllers.findAll);

/* Guardar nuevo rol */
router.post('/', auth.hasPermission('write','roles'), controllers.sanitizate, controllers.save);

/* Obtener rol por nombre*/
router.get('/:name', auth.hasPermission('read','roles'), controllers.findByName);

/* Eliminar rol */
router.delete('/:id', auth.hasPermission('delete', 'roles'), controllers.delete);

/* Actualizar rol */
router.put('/:id', auth.hasPermission('write', 'roles'), controllers.sanitizate, controllers.update);

router.get('/:id/permissions', auth.hasPermission('read', 'roles'), controllers.getPermissions);

router.put('/:id/permissions', auth.hasPermission('write', 'roles'), controllers.addPermission);

module.exports = router;
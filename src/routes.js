const express = require('express');

const UserController = require('../src/controllers/UserController');

const routes = express.Router();

routes.get('/user', UserController.index );
routes.post('/user', UserController.create );
routes.post('/user/login', UserController.login );

module.exports = routes;
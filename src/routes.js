const express = require('express');

const UserController = require('../src/controllers/UserController');

const routes = express.Router();

routes.get('/user', UserController.index );
routes.post('/user', UserController.create );

module.exports = routes;
const express = require('express');

const authMiddleware = require('./middleware/auth');

const UserController = require('../src/controllers/UserController');

const routes = express.Router();

routes.get('/user',  UserController.index );
routes.post('/user', UserController.create );
routes.post('/user/login', UserController.login );
routes.post('/user/consult', authMiddleware, UserController.consult );

module.exports = routes;
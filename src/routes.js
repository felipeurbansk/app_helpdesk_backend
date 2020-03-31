const express = require('express');

const authMiddleware = require('./middleware/auth');

const UserController = require('../src/controllers/UserController');
const TicketController = require('../src/controllers/TicketController');

const routes = express.Router();

routes.get('/user',  UserController.index );
routes.post('/user', UserController.create );
routes.post('/user/login', UserController.login );

routes.post('/user/consult', authMiddleware, UserController.consult );

routes.get('/ticket', authMiddleware, TicketController.index);
routes.post('/ticket', authMiddleware, TicketController.create);
routes.put('/ticket/', authMiddleware, TicketController.update);
routes.delete('/ticket/:id', authMiddleware, TicketController.delete);

module.exports = routes;
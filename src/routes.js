const express = require('express');

const authMiddleware = require('./middleware/auth');

const UserController = require('../src/controllers/UserController');
const TicketController = require('../src/controllers/TicketController');
const TicketMessageController = require('../src/controllers/TicketMessageController');

const routes = express.Router();

routes.get('/user',  UserController.index );
routes.post('/user', UserController.create );
routes.post('/user/login', UserController.login );

routes.get('/ticket', authMiddleware, TicketController.index);
routes.post('/ticket', authMiddleware, TicketController.create);
routes.put('/ticket', authMiddleware, TicketController.update);
routes.delete('/ticket', authMiddleware, TicketController.delete);

routes.get('/ticket/response', authMiddleware, TicketMessageController.index);
routes.post('/ticket/response', authMiddleware, TicketMessageController.create);

module.exports = routes;
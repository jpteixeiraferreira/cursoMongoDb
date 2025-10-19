const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatosController = require('./src/controllers/contatosController');
const {loginRequired} = require('./src/middlewares/middleware');
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Rotas de contato
route.get('/contatos/index', loginRequired, contatosController.index);
route.get('/contatos/index/:id', loginRequired, contatosController.editIndex);
route.post('/contatos/register', loginRequired, contatosController.register);

module.exports = route;
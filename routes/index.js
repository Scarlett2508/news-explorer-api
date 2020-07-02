const routes = require('express').Router();

const userRoutes = require('./users');
const articleRoutes = require('./articles');
const authRoutes = require('./auth');

// const auth = require('../middlewares/auth');

routes.use(authRoutes);
routes.use(userRoutes);
routes.use(articleRoutes);

module.exports = routes;

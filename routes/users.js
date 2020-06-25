const userRoutes = require('express').Router();
const { getUser } = require('../controllers/users');

userRoutes.get('/users/me', getUser);

module.exports = userRoutes;

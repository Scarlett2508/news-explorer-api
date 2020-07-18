const userRoutes = require('express').Router();
const { getUser } = require('../controllers/users');

userRoutes.get('/me', getUser);

module.exports = userRoutes;

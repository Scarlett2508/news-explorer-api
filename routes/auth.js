const routeForSignUp = require('express').Router();
const routeForSignin = require('express').Router();

const { Joi, celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');

routeForSignUp.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

routeForSignin.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = { routeForSignUp, routeForSignin };

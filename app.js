require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');

// const auth = require('./middlewares/auth');

// const { routeForSignUp, routeForSignIn } = require('./routes/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ThrowError } = require('./middlewares/throwError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/newsforsave', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', routes);
app.use(errorLogger);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// app.use('/', routeForSignUp);
// app.use('/', routeForSignIn);
// app.use(auth);

app.use(errors());
app.use(ThrowError);

app.listen(PORT);

// eslint-disable-next-line no-unused-vars
process.on('uncaughtException', (e) => {
  process.exit(1);
});

// require('dotenv').config();
// const express = require('express');

// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { celebrate, Joi } = require('celebrate');
// const { errors } = require('celebrate');
const validator = require('validator');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(requestLogger);

const validUrl = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('Неправильный формат ссылки');
  }
  return link;
};

app.use(auth);

// app.use('/users', userRoutes);
// app.use('/cards', cardRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// app.use(errorLogger);

// app.use(errors());
// app.use(ThrowError);

app.listen(PORT);

// eslint-disable-next-line no-unused-vars
process.on('uncaughtException', (e) => {
  process.exit(1);
});

require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const config = require('./config')

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { PORT, DB_URL } = require('./config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ThrowError } = require('./middlewares/throwError');

const app = express();


const corsOptions = {
    origin: [
      'localhost:3000',
      'https://localhost:3000',
      'localhost:8080',
      'https://localhost:8080',
      'https://newsforsave.tk',
      'https://scarlett2508.github.io/news-explorer-frontend',
      'http://localhost:8080/index.html',
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, 
  };
  app.use(cors(corsOptions));

//app.use(cors());

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(ThrowError);

app.listen(PORT);

process.on('uncaughtException', (e) => {
    process.exit(1);
});
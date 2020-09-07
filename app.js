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
      'http://localhost:3000',
      'http://localhost:8080',
      'https://newsforsave.tk',
      'https://scarlett2508.github.io/news-explorer-frontend'
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, 
  };
  app.use(cors(corsOptions));


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// async function start() {
//     try {
//         await mongoose.connect(config.get('DB_URL'), {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//         });
//         app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
//     } catch (e) {
//         console.log('Server Error', e.message);
//         process.exit(1);
//     }
// }

// start();

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
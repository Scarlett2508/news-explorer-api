require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { PORT, DB_URL } = require('./config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ThrowError } = require('./middlewares/throwError');

const app = express();

app.use(cors());



app.use(cors(corsOptions));

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
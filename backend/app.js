const express = require('express');
const app = express();

/* body parser */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* user controller */
const userRouter = require('./controllers/user.controller');
app.use('/api/v1', userRouter);

/* error middleware */
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');
app.use(ErrorMiddleware);

module.exports = app;
const express = require('express');
const server = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
server.use(cors());

/* database connection */
const connectMongoDB = require('./database/connection');
connectMongoDB()

/* app server */
const app = require('./app');
server.use('/', app);

/* server HTTP */
server.listen(process.env.PORT, () => {
    console.log(`server start with localhost:${process.env.PORT} and ${process.env.NODE_ENV}`);
});
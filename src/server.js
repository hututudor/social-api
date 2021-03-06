const express = require('express');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
require('winston-daily-rotate-file');

const routes = require('./routes');
const db = require('./models');
const utils = require('./utils');

const createLogger = () => {
  const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/server-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });

  return winston.createLogger({
    transports: [transport, new winston.transports.Console()]
  });
};

const connectToDatabase = async () => {
  return mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

const applyMiddlewares = async app => {
  const logger = createLogger();

  app.use(cors());
  app.use(helmet());
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    req.logger = logger;
    req.db = db;

    res.success = utils.response.success(res);
    res.error = utils.response.error(res);
    res.message = utils.response.message(res);

    next();
  });
};

const configureAWS = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_IAM_ID,
    secretAccessKey: process.env.AWS_IAM_SECRET,
    region: process.env.AWS_S3_BUCKET_REGION
  });
};

const server = async () => {
  const app = express();

  await connectToDatabase();
  await applyMiddlewares(app);
  configureAWS();

  app.use('/', routes);

  return app;
};

module.exports = server;

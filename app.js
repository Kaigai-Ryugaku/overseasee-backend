/* eslint-disable global-require */
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const CryptoJS = require('crypto-js');
const Models = require('./models');
const Services = require('./services');

const app = express();

module.exports = async () => {
  // view engine setup
  let origin = config.get('accessControlAllowOrigin');
  if (origin.indexOf('*') > -1) {
    origin = '*';
  } else {
    origin = origin.split(',');
  }
  app.use(cors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(helmet());
  app.set('json replacer', (key, value) => {
    // undefined values are set to `null`
    if (typeof value === 'undefined') {
      return null;
    }
    return value;
  });

  const { models } = Models;
  const { mongoose } = await Models.init({
    mongodb: config.get('mongodb'),
    encryptionKey: config.get('encryptionKey'),
    key: CryptoJS.enc.Utf8.parse(config.auth.userIdSaltKey),
    iv: CryptoJS.enc.Utf8.parse(config.auth.userIdSaltIv),
  });
  Services.init(models);

  const routes = require('./routes/index');
  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.send('OK');
  });

  return { app, mongoose };
};

/* eslint-disable global-require */
const config = require('config');
const debug = require('debug')('bc:Initmodel');

const mongoose = require('mongoose');

const { Schema } = mongoose;

const models = {};
exports.models = models;

exports.init = async (services) => {
  // mongoose.set('debug', true);
  mongoose.connection.on('connected', () => debug('mongodb connected'));
  mongoose.connection.on('error', (err) => debug('mongodb error', err));
  mongoose.connection.on('disconnected', () => debug('mongodb disconnected'));

  const mongodbUrlConfig = 'mongodb.url';
  const mongodbDatabaseConfig = 'mongodb.database';
  const hasUrl = config.has(mongodbUrlConfig) && config.get(mongodbUrlConfig);
  const hasDatabase = config.has(mongodbDatabaseConfig) && config.get(mongodbDatabaseConfig);

  if (!hasUrl || !hasDatabase) {
    throw new Error('請確認 monogo config');
  }

  await mongoose.connect(`${config.get(mongodbUrlConfig)}/${config.get(mongodbDatabaseConfig)}`,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    (err) => {
      if (err) debug(err);
    });

  models.User = require('./user')(mongoose, Schema, services);

  models.mongoose = mongoose;
  if (config.get('mongodb.force') && config.get('environment') !== 'production') {
    await mongoose.connection.db.dropDatabase();
  }

  models.devResetDb = async () => {
    if (config.get('mongodb.force') && config.get('environment') !== 'production') {
      await models.mongoose.connection.db.dropDatabase();
    }
  };

  return models;
};

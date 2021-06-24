#!/usr/bin/env node
/* eslint-disable global-require */

/**
 * Module dependencies.
 */

const debug = require('debug')('server');
const http = require('http');
const config = require('config');
const App = require('./app');

/**
 * Get port from environment and store in Express.
 */

const port = config.get('port');

App().then(({ app, mongoose }) => {
  app.set('port', port);
  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  server.listen(port, async () => {
    if (config.get('environment') !== 'test') {
      // can do bootstrap here
      debug('server %s', server.address().port);
    }
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      debug('Force to close the MongoDB conection');
      process.exit(0);
    });
  });
});

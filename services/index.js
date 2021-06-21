const debug = require('debug')('service');

const AuthService = require('./auth');
const AESService = require('./aes');
const UserService = require('./user');
const PolicyService = require('./policy');
const FacebookService = require('./facebook');

const services = {};

exports.services = services;

exports.init = (models) => {
  debug('=== service init ===');
  services.AuthService = new AuthService({ services, models });
  services.AESService = new AESService({ services, models });
  services.UserService = new UserService({ services, models });
  services.PolicyService = new PolicyService({ services, models });
  services.FacebookService = new FacebookService({ services, models });

  return services;
};
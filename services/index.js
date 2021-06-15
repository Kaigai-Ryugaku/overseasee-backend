const AuthService = require('./auth');
const AESService = require('./aes');
const UserService = require('./user');
const PolicyService = require('./policy');
const debug = require('debug')('service');


const services = {};

exports.services = services;

exports.init = (models) => {
  debug('=== service init ===');
  services.AuthService = new AuthService({ services, models });
  services.AESService = new AESService({ services, models });
  services.UserService = new UserService({ services, models });
  services.PolicyService = new PolicyService({ services, models });

  return services;
};
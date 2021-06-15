const _ = require('lodash');

module.exports = class MsgForbidden extends Error {
  constructor(message) {
    super();

    let errorCode = 403;
    let err = message;
    if (_.isString(message) && message.indexOf('--') > -1) {
      err = message.split('--');
      errorCode = err[0];
      message = err[1];
    }

    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = parseInt(errorCode, 10);

    return this;
  }
};

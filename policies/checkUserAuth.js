
const debug = require('debug')('bc:PoliciesCheckUserAuth');

const {
  PolicyService,
} = require('../services').services;

module.exports = async (req, res, next) => {
  try {
    debug('=== checkUserAuth ====');
    debug(req.headers);

    delete req.body.currentUserId;
    delete req.query.currentUserId;

    const { authorization = '' } = req.headers;

    debug('Authorization');
    debug(authorization);
    const { currentUserId, userModel } = await PolicyService.checkUserAuth({
      accessToken: authorization,
    });

    if (req.method !== 'GET') {
      req.body.currentUserId = currentUserId;
      req.body.userModel = userModel;
    } else {
      req.query.currentUserId = currentUserId;
      req.query.userModel = userModel;
    }
    next();
  } catch (error) {
    next(error);
  }
};

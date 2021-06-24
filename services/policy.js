const debug = require('debug')('bc:PoliciesService');
const logger = require('../logger');
const _ = require('lodash');
const MsgUnauthorized = require('../utils/MsgUnauthorized');

module.exports = class PoliciesService {
  constructor({ services, models }) {
    this.services = services;
    this.models = models;
  }

  async checkUserAuth({
    accessToken = '',
  }) {
    try {
      logger.info('checkUserAuth');
      const splitAuthorization = accessToken.split(' ');
      const token = splitAuthorization[1];
      if (_.isEmpty(token) || token === 'undefined') throw new MsgUnauthorized('請帶入正確 accessToken');
      let payload = {};
      try {
        payload = this.services.AuthService.verifyToken({ token });
      } catch (error) {
        throw new MsgUnauthorized(error);
      }
      debug(payload);

      const user = await this.models.User.findOne({
        _id: payload.userId,
      });
      if (_.isEmpty(user)) throw new MsgUnauthorized('找不到該用戶');
      return {
        currentUserId: user._id.toString(),
        userModel: user,
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
};

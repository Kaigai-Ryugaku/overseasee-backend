const logger = require('../logger');
module.exports = class UserService {
  constructor({ services, models }) {
    this.services = services;
    this.models = models;
  }

  async getUserInfo({
    currentUserId,
  }) {
    try {
      logger.info('getUserInfo');
      const user = await this.models.User.findOne({
        _id: currentUserId,
      });
      return {
        userName: user.name,
        userEmail: user.email,
        lastLogin: user.modified_time,
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
};



module.exports = class UserService {
  constructor({ services, models }) {
    this.services = services;
    this.models = models;
  }

  
  async getUserInfo({
    currentUserId,
  }) {
    try {
      console.log('getUserInfo');
      const user = await this.models.User.findOne({
        _id: currentUserId,
      });
      return {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        lastLogin: user.modified_time,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
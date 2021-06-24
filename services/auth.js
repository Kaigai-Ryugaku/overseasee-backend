/* eslint-disable eqeqeq */
const config = require('config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../logger');

const MsgForbidden = require('../utils/MsgForbidden');

module.exports = class AuthService {
  constructor({ services, models }) {
    this.services = services;
    this.models = models;
  }

  verifyToken({ token }) {
    try {
      if (token) token = token.replace('Bearer ', '');
      const secret = config.get('auth.secret');
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  getToken({ userId, expiresIn = config.get('auth.expiresIn') }) {
    try {
      const secret = config.get('auth.secret');
      return jwt.sign({ userId }, secret, { expiresIn });
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async login({
    email,
    password,
  }) {
    try {
      logger.info('login');

      const user = await this.models.User.findOne({
        email,
      });
      const modified_time = moment().format('YYYY-MM-DD HH:mm:ss');
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          await this.models.User.updateOne({
            email,
          }, {
            modified_time,
          });
        } else {
          throw new MsgForbidden('password incorrect!');
        }
      } else {
        throw new MsgForbidden('user not found');
      }
      return {
        accessToken: this.getToken({ userId: user._id }),
        userName: user.name,
        userEmail: user.email,
        lastLogin: modified_time,
      };
    } catch (error) {
      throw error;
    }
  }

  async signup({
    email,
    password,
    name,
  }) {
    try {
      const exist = await this.models.User.findOne({
        email,
      });
      if (exist) {
        throw new MsgForbidden('user exists');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.models.User.create({
        name,
        email,
        password: hashedPassword,
      });
      return {
        userName: user.name,
        userEmail: user.email,
        creatTime: user.created_time,
      };
    } catch (error) {
      throw error;
    }
  }

  async facebookLoginCallback({
    code,
    redirect_uri,
    facebookAccessToken,
  }) {
    try {
      // get facebookAccessToken by code
      if (!facebookAccessToken) {
        const accessToken = await this.services.FacebookService.getAccessTokenByCode({ code, redirect_uri });
        facebookAccessToken = accessToken.access_token;
      }
      // get facebookUserID and profile by facebookAccessToken
      const facebookProfile = await this.services.FacebookService.getProfile({ accessToken: facebookAccessToken });
      let user = await this.models.User.findOne({
        facebook_user_id: facebookProfile.id,
      });

      // create new account if first use facebook login
      if (!user) {
        user = await this.models.User.create({
          name: facebookProfile.name,
          email: facebookProfile.email,
          facebook_user_id: facebookProfile.id,
        });
      }

      // update last login time
      const modifiedTime = moment().format('YYYY-MM-DD HH:mm:ss');
      await this.models.User.updateOne({
        _id: user._id,
      }, {
        modified_time: modifiedTime,
      });

      return {
        accessToken: this.getToken({ userId: user._id }), // use mongodb id
        userName: user.name,
        userEmail: user.email,
        lastLogin: modifiedTime,
      };
    } catch (error) {
      throw error;
    }
  }

  async googleLoginCallback({
    code,
    redirect_uri,
    googleAccessToken,
  }) {
    try {
      // get googleAccessToken by code
      if (!googleAccessToken) {
        const accessToken = await this.services.GoogleService.getAccessTokenByCode({ code, redirect_uri });
        googleAccessToken = accessToken.access_token;
      }
      // get googleUserID and profile by googleAccessToken
      const googleProfile = await this.services.GoogleService.getProfile({ accessToken: googleAccessToken });
      let user = await this.models.User.findOne({
        google_user_id: googleProfile.id,
      });

      // create new account if first use google login
      if (!user) {
        user = await this.models.User.create({
          name: googleProfile.name,
          email: googleProfile.email,
          google_user_id: googleProfile.id,
          cover_photo_url: googleProfile.picture,
        });
      }

      // update last login time
      const modifiedTime = moment().format('YYYY-MM-DD HH:mm:ss');
      await this.models.User.updateOne({
        _id: user._id,
      }, {
        modified_time: modifiedTime,
      });

      return {
        accessToken: this.getToken({ userId: user._id }), // use mongodb id
        userName: user.name,
        userEmail: user.email,
        lastLogin: modifiedTime,
      };
    } catch (error) {
      throw error;
    }
  }
};

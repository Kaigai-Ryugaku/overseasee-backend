/* eslint-disable eqeqeq */
const config = require('config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
      console.error(error);
      throw error;
    }
  }

  getToken({ userId, expiresIn = config.get('auth.expiresIn') }) {
    try {
      const secret = config.get('auth.secret');
      return jwt.sign({ userId }, secret, { expiresIn });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login({
    email,
    password,
  }) {
    try {
      console.log('login');

      let user = await this.models.User.findOne({
        email: email,
      });
      let modified_time = moment().format('YYYY-MM-DD HH:mm:ss')
      if (user) {
        console.log(user.password)
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          await this.models.User.updateOne({
            email: email,
          }, {
            modified_time: modified_time,
          });        
        } else {
          throw new MsgForbidden('password incorrect!');
        }
      } else {
        throw new MsgForbidden('user not found');
      }
      return {
        accessToken: this.getToken({ userId: user._id }),
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        lastLogin: modified_time,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signup({
    email,
    password,
    name
  }) {
    try {
      
      let exist = await this.models.User.findOne({
        email: email,
      });
      if (exist) { 
        throw new MsgForbidden('user exists');
      } 

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.models.User.create({
        name: name,
        email: email,
        password: hashedPassword
      })
      return {
        "userName": user.name,
        "userEmail": user.email,
        "creatTime": user.created_time ,
      };
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

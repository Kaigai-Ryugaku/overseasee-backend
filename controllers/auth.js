const logger = require('../logger');
const {
  AuthService,
} = require('../services').services;

module.exports = {
  /**
   * {post} /api/auth/login 登入
   *
   * controllers/auth.login
   *
   *
   * {json} Success-Response:
   *     HTTP/1.1 200 OK
        {
          "success": true,
          "errorCode": 0,
          "message": "successed",
          "data": {
            "accessToken": "5b6a9b156dd6ce5086592376",
            "userId": "5b6a9b156dd6ce5086592376",
            "userName": "test",
            "userEmail": "test@gmail,com",
            "lastLogin": "2021-06-11 22:23:47",
          }
        }
   */
  async login(req, res, next) {
    try {
      const result = await AuthService.login(req.body);
      const data = {
        success: true,
        errorCode: 0,
        message: 'successed',
        data: result,
      };
      logger.info(data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

  /**
   * {post} /api/auth/signup 登入
   *
   * controllers/auth.signup
   *
   * {json} Success-Response:
   *     HTTP/1.1 200 OK
        {
          "success": true,
          "errorCode": 0,
          "message": "successed",
          "data": {
            "userName": "test",
            "userEmail": "test@gamil.com",
            "creatTime": "2021-06-11 22:23:47",
          }
        }
   */
  async signup(req, res, next) {
    try {
      const result = await AuthService.signup(req.body);
      const data = {
        success: true,
        errorCode: 0,
        message: 'successed',
        data: result,
      };
      logger.info(data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
  /**
   * {get} /api/auth/facebook/callback facebook登入
   *
   * controllers/auth.facebookLoginCallback
   *
   * {json} Success-Response:
   *     HTTP/1.1 200 OK
        {
          "success": true,
          "errorCode": 0,
          "message": "successed",
          "data": {
            "accessToken": "5b6a9b156dd6ce5086592376",
            "userName": "test",
            "userEmail": "test@gamil.com",
            "lastLogin": "2021-06-11 22:23:47",
          }
        }
   */
  async facebookLoginCallback(req, res, next) {
    try {
      const result = await AuthService.facebookLoginCallback(req.query);
      const data = {
        success: true,
        errorCode: 0,
        message: 'successed',
        data: result,
      };
      logger.info(data);
      res.json(data);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  /**
   * {get} /api/auth/google/callback google
   *
   * controllers/auth.googleLoginCallback
   *
   * {json} Success-Response:
   *     HTTP/1.1 200 OK
        {
          "success": true,
          "errorCode": 0,
          "message": "successed",
          "data": {
            "accessToken": "5b6a9b156dd6ce5086592376",
            "userName": "test",
            "userEmail": "test@gamil.com",
            "lastLogin": "2021-06-11 22:23:47",
          }
        }
   */
  async googleLoginCallback(req, res, next) {
    try {
      const result = await AuthService.googleLoginCallback(req.query);
      const data = {
        success: true,
        errorCode: 0,
        message: 'successed',
        data: result,
      };
      logger.info(data);
      res.json(data);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};

const debug = require('debug')('bc:UserController');
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
        console.log(req.body)
      const result = await AuthService.login(req.body);
      const data = {
        success: true,
        errorCode: 0,
        message: 'successed',
        data: result,
      };
      console.log(data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * @api {post} /api/auth/signup 登入
   *
   * @apiName controllers/auth.signup
   *
   * @apiSuccessExample {json} Success-Response:
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
        console.log(req.body)
      const result = await AuthService.signup(req.body);
      const data = {
        success: true,
        errorCode: 0,
        message: 'successed',
        data: result,
      };
      debug(data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  },

};

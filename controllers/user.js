const {
  UserService,
} = require('../services').services;

module.exports = {
  /**
   * {get} /api/user 取得個人資料
   *
   * controllers/user.getUserInfo
   *
   * {json} Success-Response:
   *     HTTP/1.1 200 OK
        {
          "success": true,
          "errorCode": 0,
          "message": "successed",
          "data": {
            "userName": "test",
            "userEmail" : "xxx@gmail.com"
          }
        }
   */
  async getUserInfo(req, res, next) {
    try {
      const result = await UserService.getUserInfo(req.query);
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

};

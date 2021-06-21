const config = require('config');
const axios = require('axios');

module.exports = class FacebookService {
  constructor() {
    this.facebookApi = axios.create({
      baseURL: config.get('facebook.baseURL'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this.client_id = config.get('facebook.appId')
    this.client_secret = config.get('facebook.appSecret')
  }

  async getAccessTokenByCode({
    redirect_uri,
    code
  }) {
    try {
      const params = {
        client_id: this.client_id,
        redirect_uri: redirect_uri,
        client_secret: this.client_secret,
        code: code
      }
      const accessToken = await this.facebookApi.get('/oauth/access_token', { params: params })
      
      return accessToken.data
    } catch (error) {
      throw error;
    }
  }
  async getProfile({
    accessToken,
  }) {
    try {
      const params = {
        access_token: accessToken,
        fields: config.get('facebook.scope')
      }
      const profile = await this.facebookApi.get('/me', { params: params })

      return profile.data
    } catch (error) {
      throw error;
    }
  }

};

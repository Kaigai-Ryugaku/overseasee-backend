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
    this.clientId = config.get('facebook.appId');
    this.clientSecret = config.get('facebook.appSecret');
  }

  async getAccessTokenByCode({
    redirect_uri,
    code,
  }) {
    try {
      const params = {
        client_id: this.clientId,
        redirect_uri,
        client_secret: this.clientSecret,
        code,
      };
      const accessToken = await this.facebookApi.get('/oauth/access_token', { params });

      return accessToken.data;
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
        fields: config.get('facebook.scope'),
      };
      const profile = await this.facebookApi.get('/me', { params });

      return profile.data;
    } catch (error) {
      throw error;
    }
  }
};

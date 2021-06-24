const config = require('config');
const axios = require('axios');

module.exports = class GoogleService {
  constructor() {
    this.GoogleOAuthApi = axios.create({
      baseURL: config.get('google.oauthBaseURL'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this.GoogleApi = axios.create({
      baseURL: config.get('google.baseURL'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    this.client_id = config.get('google.clientId');
    this.client_secret = config.get('google.clientSecret');
  }

  async getAccessTokenByCode({
    redirect_uri,
    code,
  }) {
    try {
      const params = {
        client_id: this.client_id,
        redirect_uri,
        client_secret: this.client_secret,
        code,
        grant_type: 'authorization_code',
      };
      const accessToken = await this.GoogleOAuthApi.post('/token', new URLSearchParams(params));
      console.log(accessToken.data);
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
      };
      const profile = await this.GoogleApi.get('/userinfo', { params });
      console.log(profile.data);

      return profile.data;
    } catch (error) {
      throw error;
    }
  }
};

const CryptoJS = require('crypto-js');
const config = require('config');

const key = CryptoJS.enc.Utf8.parse(config.auth.userIdSaltKey);
const iv = CryptoJS.enc.Utf8.parse(config.auth.userIdSaltIv);

module.exports = class AESService {
  encrypt(str) {
    const encrypted = CryptoJS.AES.encrypt(
      str,
      key,
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      },
    );
    return encrypted.toString();
  }

  decrypt(str) {
    try {
      if (str) {
        const decrypted = CryptoJS.AES.decrypt(str, key, { iv, padding: CryptoJS.pad.ZeroPadding });
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

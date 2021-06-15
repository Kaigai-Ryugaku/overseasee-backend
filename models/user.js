const config = require('config');
const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;


module.exports = (mongoose, Schema, services) => {
    const userSchema = new Schema({
    //   user_id: { type: String, required: true },
      name: { type: String, required: true },
      cover_photo_url: { type: String },
      password: { type: String },
      email: { type: String },
      created_time: { type: Date, default: Date.now },
      modified_time: { type: Date },
    });
  
    userSchema.set('toObject', { getters: true });
    userSchema.set('toJSON', { getters: true });
    userSchema.index({ _id: 1, email: 1, name: 1 });
  
    const secret = config.get('encryptionKey');
    userSchema.plugin(mongooseFieldEncryption, { fields: ['password'], secret });
  
    const User = mongoose.model('user', userSchema);

    return User;
  };
  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // md5加密
  role: {type: String, default: 1}, // front 前端 back 后端
  avatar: {type: String, default: 'default.png'},
  email: { type: String, default: '' },
  regDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', UserSchema);

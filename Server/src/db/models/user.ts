import mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { type: String, },
  passWord: { type: String, }, // md5加密
  role: {type: String, default: 1}, // front 前端 back 后端 admin 管理员
  avatar: {type: String, default: 'default.png'},
  email: { type: String, default: '' },
  regDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    userName: { type: String, },
    passWord: { type: String, },
    role: { type: String, default: 1 },
    avatar: { type: String, default: 'default.png' },
    email: { type: String, default: '' },
    regDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map
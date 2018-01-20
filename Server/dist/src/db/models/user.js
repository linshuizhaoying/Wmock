const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 1 },
    avatar: { type: String, default: 'default.png' },
    email: { type: String, default: '' },
    regDate: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map
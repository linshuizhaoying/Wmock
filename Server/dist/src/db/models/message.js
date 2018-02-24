"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now() },
    operatorId: { type: String },
    operatorName: { type: String },
    action: { type: String },
    projectId: { type: String },
    objectId: { type: String },
    objectName: { type: String },
    desc: { type: String },
    userId: { type: String },
    avatar: { type: String },
    type: { type: String },
    readed: { type: Boolean, default: false }
});
module.exports = mongoose.model('Message', MessageSchema);
//# sourceMappingURL=message.js.map
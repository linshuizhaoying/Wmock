import mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  operatorId: { type: String },
  operatorName: { type: String },
  action: { type: String }, // add update delete invite apply
  projectId: { type: String },
  objectId: { type: String },
  objectName: { type: String },
  desc: { type: String },
  userId: { type: String },
  avatar: { type: String },
  type: { type: String },  // normal || team
  readed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message', MessageSchema);

import mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  content: { type: String },
  desc: { type: String },
  name: { type: String },
  ownerId: { type: String },
  ownerName: { type: String },
  assign: [],
  type: { type: String }, // project other  spec
});

module.exports = mongoose.model('Document', DocumentSchema);
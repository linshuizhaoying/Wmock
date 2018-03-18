import mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  modelDataName: { type: String },
  modelDesc: { type: String },
  modelMode: { type: String },
  userId: { type: String },
  // userName: { type: String },
});

module.exports = mongoose.model('Model', ModelSchema);
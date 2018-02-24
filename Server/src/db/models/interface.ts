import mongoose = require('mongoose');

const InterfaceSchema = new mongoose.Schema({
  projectId: { type: String },
  interfaceName: { type: String },
  url: { type: String },
  method: { type: String },
  desc: { type: String },
  mode: { type: String },
});

module.exports = mongoose.model('Interface', InterfaceSchema);
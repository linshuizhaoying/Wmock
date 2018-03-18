import mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const stringId = mongoose.Schema.Types.String;
const TeamSchema = new mongoose.Schema({
  // masterAvatar: { type: String },
  masterId: { type: String },
  role: { type: String },
  masterName: {
    type: stringId,
    ref: "User"
  },
  masterAvatar: {
    type: stringId,
    ref: "User"
  },
  projectId: { type: String },
  projectName: {
    type: stringId,
    ref: "Project"
  },
  member: [
    {
      type: ObjectId,
      ref: "User",
      default: []
    }
  ]
});

module.exports = mongoose.model("Team", TeamSchema);

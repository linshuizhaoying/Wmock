"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const TeamSchema = new mongoose.Schema({
    masterAvatar: { type: String },
    masterId: { type: String },
    role: { type: String },
    masterName: { type: String },
    projectId: { type: String },
    projectName: { type: String },
    member: [{
            type: ObjectId,
            ref: 'User',
            default: []
        }],
});
module.exports = mongoose.model('Team', TeamSchema);
//# sourceMappingURL=team.js.map
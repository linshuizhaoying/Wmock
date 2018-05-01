"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const ProjectSchema = new mongoose.Schema({
    projectName: { type: String },
    projectUrl: { type: String },
    projectDesc: { type: String },
    version: { type: String, default: 'v1.0' },
    transferUrl: { type: String },
    status: { type: String, default: 'mock' },
    type: { type: String },
    masterId: { type: String },
    visible: { type: Boolean, default: true }
});
module.exports = mongoose.model('Project', ProjectSchema);
//# sourceMappingURL=project.js.map
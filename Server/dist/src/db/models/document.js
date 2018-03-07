"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DocumentSchema = new mongoose.Schema({
    content: { type: String },
    desc: { type: String },
    name: { type: String },
    ownerId: { type: String },
    ownerName: { type: String },
    assign: [],
    type: { type: String },
});
module.exports = mongoose.model('Document', DocumentSchema);
//# sourceMappingURL=document.js.map
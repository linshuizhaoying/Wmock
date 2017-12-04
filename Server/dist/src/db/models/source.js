"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const SourceSchema = new mongoose.Schema({
    sourceTitle: { type: String },
    url: { type: String },
    type: { type: String },
    code: { type: String },
    lang: { type: String },
    CreateDate: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('Source', SourceSchema);
//# sourceMappingURL=source.js.map
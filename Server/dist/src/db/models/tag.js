"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TagSchema = new mongoose.Schema({
    tagTitle: { type: String },
    status: { type: String },
});
module.exports = mongoose.model('Tag', TagSchema);
//# sourceMappingURL=tag.js.map
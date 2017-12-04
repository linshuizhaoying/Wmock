"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const NewsSchema = new mongoose.Schema({
    title: { type: String },
    enTitle: { type: String },
    url: { type: String },
    sourceTitle: { type: String },
    sourceLink: { type: String },
    type: { type: String },
    tagList: { type: String },
    read: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    CreateDate: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('News', NewsSchema);
//# sourceMappingURL=news.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const stringId = mongoose.Schema.Types.String;
const DocumentSchema = new mongoose.Schema({
    content: { type: String },
    desc: { type: String },
    name: { type: String },
    ownerId: { type: String },
    ownerName: {
        type: String,
        ref: "User"
    },
    assign: [],
    type: { type: String } // project other  spec
});
module.exports = mongoose.model("Document", DocumentSchema);
//# sourceMappingURL=document.js.map
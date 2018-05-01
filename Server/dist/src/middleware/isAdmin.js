"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../db/controllers");
exports.default = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const userId = ctx.tokenContent.userId;
    const result = yield controllers_1.FindUserById(userId);
    if (result.role !== "admin") {
        ctx.throw(401, "非法访问!");
    }
    yield next();
});
//# sourceMappingURL=isAdmin.js.map
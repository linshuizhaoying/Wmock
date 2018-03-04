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
const Team = require('../models/team');
exports.FindTeamByProjectId = (id) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Team.findOne({ projectId: id });
    return result;
});
exports.TeamList = (id) => __awaiter(this, void 0, void 0, function* () {
    return yield Team.find({ masterId: id });
});
exports.AddTeam = (team) => __awaiter(this, void 0, void 0, function* () {
    const newTeam = new Team(team);
    let result = '';
    yield newTeam.save((error) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            result = error.toString();
        }
    })).then((team) => __awaiter(this, void 0, void 0, function* () {
        result = team._id;
    }));
    return result;
});
//# sourceMappingURL=team.js.map
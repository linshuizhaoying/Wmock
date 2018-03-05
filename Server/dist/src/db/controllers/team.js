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
const user_1 = require("./user");
const project_1 = require("./project");
const Team = require('../models/team');
exports.FindTeamByProjectId = (id) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Team.findOne({ projectId: id }).populate('member');
    return result;
});
exports.TeamList = (userId) => __awaiter(this, void 0, void 0, function* () {
    // return await Team.find({ masterId: id }).populate('member')
    const projectMap = yield project_1.FindProjectListByUserId(userId);
    const teamList = [];
    for (const projectId in projectMap) {
        const temp = yield exports.FindTeamByProjectId(projectId);
        teamList.push(temp);
    }
    return teamList;
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
exports.UpdateTeamMember = (team) => __awaiter(this, void 0, void 0, function* () {
    return yield Team.update({
        _id: team._id
    }, {
        $set: {
            member: team.member
        }
    });
});
exports.AddUserToTeam = (projectId, userId) => __awaiter(this, void 0, void 0, function* () {
    const originTeam = yield Team.findOne({ projectId: projectId });
    const user = yield user_1.FindUserById(userId);
    originTeam.member.push(user);
    console.log(originTeam);
    return yield exports.UpdateTeamMember(originTeam);
});
exports.RemoveGroupMember = (projectId, userId) => __awaiter(this, void 0, void 0, function* () {
    const originTeam = yield exports.FindTeamByProjectId(projectId);
    for (let i = 0; i < originTeam.member.length; i++) {
        if (originTeam.member[i]._id == userId) {
            originTeam.member.splice(i, 1);
        }
    }
    return yield exports.UpdateTeamMember(originTeam);
});
exports.RemoveTeamByProjectId = (projectId) => __awaiter(this, void 0, void 0, function* () {
    return Team.remove({
        _id: projectId
    });
});
//# sourceMappingURL=team.js.map
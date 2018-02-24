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
    console.log(id);
    const data = [{
            _id: 'team001',
            projectId: 'project001',
            projectName: 'REST接口示例超长字符串测试asd123',
            member: [{
                    userId: 'user002',
                    userName: '哈哈哈',
                    role: 'front',
                    avatar: 'default.png'
                }],
            masterId: '5a62f8c18eccdb0fce43614b',
            masterName: '咩咩咩',
            masterAvatar: 'default.png'
        }, {
            _id: 'team002',
            projectId: 'project002',
            projectName: '基本操作示例',
            member: [{
                    userId: 'user002',
                    userName: '略略略',
                    role: 'back',
                    avatar: 'default.png'
                }, {
                    userId: 'user003',
                    userName: '老夫聊发少年狂',
                    role: 'back',
                    avatar: 'default.png'
                }
            ],
            masterId: 'user001',
            masterName: '咩咩咩',
            masterAvatar: 'default.png'
        }, {
            _id: 'team003',
            projectId: 'project003',
            projectName: 'nothing',
            member: [],
            masterId: 'user002',
            masterName: '略略略',
            masterAvatar: 'default.png'
        }
    ];
    return yield data;
});
exports.AddTeam = (team) => __awaiter(this, void 0, void 0, function* () {
    const newTeam = new Team(team);
    let result = 'success';
    newTeam.save((error) => {
        if (error) {
            result = error.toString();
        }
    });
    return result;
});
//# sourceMappingURL=team.js.map
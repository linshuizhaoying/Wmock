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
exports.myTeam = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log(id);
    const data = [{
            _id: 'team001',
            project_id: 'project001',
            project_name: 'REST接口示例超长字符串测试asd123',
            member: [{
                    userid: 'user002',
                    username: '哈哈哈',
                    role: 'front',
                    avatar: 'default.png'
                }],
            master_id: '5a62f8c18eccdb0fce43614b',
            master_name: '咩咩咩',
            master_avatar: 'default.png'
        }, {
            _id: 'team002',
            project_id: 'project002',
            project_name: '基本操作示例',
            member: [{
                    userid: 'user002',
                    username: '略略略',
                    role: 'back',
                    avatar: 'default.png'
                }, {
                    userid: 'user003',
                    username: '老夫聊发少年狂',
                    role: 'back',
                    avatar: 'default.png'
                }
            ],
            master_id: 'user001',
            master_name: '咩咩咩',
            master_avatar: 'default.png'
        }, {
            _id: 'team003',
            project_id: 'project003',
            project_name: 'nothing',
            member: [],
            master_id: 'user002',
            master_name: '略略略',
            master_avatar: 'default.png'
        }
    ];
    return yield data;
});
//# sourceMappingURL=team.js.map
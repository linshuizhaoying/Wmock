
export const myTeam = async(id: string) => {
    console.log(id)
    const data  = [{
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
  ]
    return await data
}
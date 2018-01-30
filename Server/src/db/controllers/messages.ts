interface Message  {
  time: Date,
  operator: String,
  action: String,
  object: String,
  desc: String
}

export const AllMessages = async() => {
  const data = [
    {
      _id: 'message001',
      time: '2017-12-09  21:54:46',
      operatorId: 'user001',
      operatorName: '小二',
      action: 'add', // add update delete invite apply
      projectId: 'project001',
      objectId: 'project001',
      objectName: '项目',
      desc: '新增项目: xxx',
      userId: 'test001',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'normal',  // nomarl || team
      readed: false
    },
    {
      _id: 'message002',
      time: '2017-12-09  21:54:46',
      operatorId: 'user001',
      operatorName: '小二',
      action: 'update', // add update delete invite apply
      projectId: 'project001',
      objectId: 'project001',
      objectName: '项目',
      desc: '更新项目: xxx',
      userId: 'test001',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'normal',  // nomarl || team
      readed: false
    },
    {
      _id: 'message003',
      time: '2016-12-09  21:54:46',
      operatorId: 'user001',
      operatorName: '小二',
      action: 'delete', // add update delete invite apply
      projectId: 'project001',
      objectId: 'project001',
      objectName: '项目',
      desc: '删除项目: xxx',
      userId: 'test001',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'normal',  // nomarl || team
      readed: false
    },
    {
      _id: 'message004',
      time: '2018-12-09  21:54:46',
      operatorId: 'user001',
      operatorName: '小二',
      action: 'invite', // add update delete invite apply
      projectId: 'project001',
      objectId: 'user001',
      objectName: '哈哈哈',
      desc: '邀请 哈哈哈 加入 项目团队 Wmock项目',
      userId: 'test001',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'team',  // nomarl || team
      readed: false
    },
    {
      _id: 'message005',
      time: '2017-12-07  21:54:46',
      operatorId: 'user001',
      operatorName: '小二',
      action: 'apply', // add update delete invite apply
      projectId: 'project002',
      objectId: '',
      objectName: '',
      desc: '小二 申请 加入 项目团队 Wmock项目',
      userId: 'test001',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'team',  // nomarl || team
      readed: false
    }
  ]
  return await data
}
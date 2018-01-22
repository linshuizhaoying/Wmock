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
      operator_id: 'user001',
      operator_name: '小二',
      action: 'add', // add update delete invite apply
      project_id: 'project001',
      object_id: 'project001',
      object_name: '项目',
      desc: '新增项目: xxx',
      userId: 'test001',
      Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'normal',  // nomarl || team
      readed: false
    },
    {
      _id: 'message002',
      time: '2017-12-09  21:54:46',
      operator_id: 'user001',
      operator_name: '小二',
      action: 'update', // add update delete invite apply
      project_id: 'project001',
      object_id: 'project001',
      object_name: '项目',
      desc: '更新项目: xxx',
      userId: 'test001',
      Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'normal',  // nomarl || team
      readed: false
    },
    {
      _id: 'message003',
      time: '2016-12-09  21:54:46',
      operator_id: 'user001',
      operator_name: '小二',
      action: 'delete', // add update delete invite apply
      project_id: 'project001',
      object_id: 'project001',
      object_name: '项目',
      desc: '删除项目: xxx',
      userId: 'test001',
      Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'normal',  // nomarl || team
      readed: false
    },
    {
      _id: 'message004',
      time: '2018-12-09  21:54:46',
      operator_id: 'user001',
      operator_name: '小二',
      action: 'invite', // add update delete invite apply
      project_id: 'project001',
      object_id: 'user001',
      object_name: '哈哈哈',
      desc: '邀请 哈哈哈 加入团队',
      userId: 'test001',
      Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'team',  // nomarl || team
      readed: false
    },
    {
      _id: 'message005',
      time: '2017-12-07  21:54:46',
      operator_id: 'user001',
      operator_name: '小二',
      action: 'apply', // add update delete invite apply
      project_id: 'project002',
      object_id: '',
      object_name: '',
      desc: '小二 申请 加入团队',
      userId: 'test001',
      Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      type: 'team',  // nomarl || team
      readed: false
    }
  ]
  return await data
}
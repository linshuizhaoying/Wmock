
export const AllProject = async(username: string) => {
  if (username === 'demo') {
    const data = [
       {
        _id: 'project001',
        projectName: 'REST接口示例超长字符串测试asd123',
        projectUrl: '/project001',
        projectDesc: '项目描述',
        version: 'v1.0',
        teamMember: [
          {
            _id: 'user001',
            username: '2333',
            role: '前端工程师',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          },
          {
            _id: 'user002',
            username: '宋青树',
            role: '后端工程师',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          },
        ],
        interfaceList: [
          {
            _id: 'interface001',
            interfaceName: '获取',
            url: '/getAll',
            method: 'get',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          },
          {
            _id: 'interface002',
            interfaceName: '增加',
            url: '/add',
            method: 'post',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          },
          {
            _id: 'interface003',
            interfaceName: '删除',
            url: '/delete',
            method: 'delete',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          },
          {
            _id: 'interface004',
            interfaceName: '更新',
            url: '/update',
            method: 'put',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          }
        ]
      },
      {
        _id: 'project002',
        projectName: '基本操作示例',
        projectUrl: '/project002',
        projectDesc: '项目描述',
        version: 'v2.0',
        teamMember: [
          {
            _id: 'user001',
            username: '2333',
            role: '前端工程师',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          },
          {
            _id: 'user002',
            username: '妮妮',
            role: '前端工程师',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          },
          {
            _id: 'user003',
            username: '苏苏',
            role: '后端工程师',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          },
        ],
        interfaceList: [
          {
            _id: 'interface005',
            interfaceName: '注册',
            url: '/reg',
            method: 'post',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          },
          {
            _id: 'interface006',
            interfaceName: '登录',
            url: '/login',
            method: 'post',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          },
          {
            _id: 'interface007',
            interfaceName: 'token',
            url: '/token',
            method: 'post',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          },
          {
            _id: 'interface008',
            interfaceName: '退出',
            url: '/logout',
            method: 'post',
            desc: '接口描述',
            mode: '{data: 1 || 2}'
          }
        ]
      }
  ]
    return await data
  } else {
    const data = [ username, '2333' ]
    return await data
  }

}

export const DemoProject = async(username: string) => {
  console.log(username)

  const data = [
      {
      _id: 'project001',
      projectName: '演示项目 - REST接口示例超长字符串测试asd123',
      projectUrl: '/project001',
      projectDesc: '项目描述',
      version: 'v1.0',
      transferUrl: 'http://haoqiao.me/api/project',
      status: 'transfer',
      type: 'demo',
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
      projectName: '演示项目 - 基本操作示例',
      projectUrl: '/project002',
      projectDesc: '项目描述',
      version: 'v2.0',
      transferUrl: 'http://haoqiao.me/api/project',
      status: 'mock',
      type: 'demo',
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
}

export const UserProject = async(username: string) => {
  console.log(username)

  const data = [
      {
      _id: 'project003',
      projectName: 'REST接口示例超长字符串测试asd123',
      projectUrl: '/project003',
      projectDesc: '项目描述',
      version: 'v1.0',
      transferUrl: 'http://haoqiao.me/api/project',
      status: 'transfer',
      type: 'user',
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
      _id: 'project004',
      projectName: '基本操作示例',
      projectUrl: '/project004',
      projectDesc: '项目描述',
      version: 'v2.0',
      transferUrl: 'http://haoqiao.me/api/project',
      status: 'mock',
      type: 'user',
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
}


export const UnJoinProjectList = async(id: string) => {
  console.log(id)
  const data = [
    {
      projectId: 'proejct110',
      projectName: '尚未加入的项目001',
    },
    {
      projectId: 'proejct111',
      projectName: '尚未加入的项目002',
    },
    {
      projectId: 'proejct112',
      projectName: '尚未加入的项目003',
    }
  ]
  return await data
}
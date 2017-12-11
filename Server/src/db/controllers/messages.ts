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
      time: '2017-12-09  21:54:46',
      operator: '123asd',
      action: '新增',
      object: '项目',
      desc: '新增项目: xxx'
    },
    {
      time: '2017-12-08  21:54:46',
      operator: '2333',
      action: '删除',
      object: '项目',
      desc: '删除项目: xxx'
    },
    {
      time: '2017-12-07  21:54:46',
      operator: '123asd',
      action: '修改',
      object: '接口',
      desc: '修改接口信息'
    },
    {
      time: '2017-12-06  21:54:46',
      operator: '123asd',
      action: '新增',
      object: '接口',
      desc: '新增接口: 6666'
    },
    {
      time: '2017-12-08  21:54:46',
      operator: '2333',
      action: '删除',
      object: '项目',
      desc: '删除项目: xxx'
    },
    {
      time: '2017-12-07  21:54:46',
      operator: '123asd',
      action: '修改',
      object: '接口',
      desc: '修改接口信息'
    },
    {
      time: '2017-12-06  21:54:46',
      operator: '123asd',
      action: '新增',
      object: '接口',
      desc: '新增接口: 6666'
    },
    {
      time: '2017-12-08  21:54:46',
      operator: '2333',
      action: '删除',
      object: '项目',
      desc: '删除项目: xxx'
    },
    {
      time: '2017-12-07  21:54:46',
      operator: '123asd',
      action: '修改',
      object: '接口',
      desc: '修改接口信息'
    },
    {
      time: '2017-12-06  21:54:46',
      operator: '123asd',
      action: '新增',
      object: '接口',
      desc: '新增接口: 6666'
    },
    {
      time: '2017-12-08  21:54:46',
      operator: '2333',
      action: '删除',
      object: '项目',
      desc: '删除项目: xxx'
    },
    {
      time: '2017-12-07  21:54:46',
      operator: '123asd',
      action: '修改',
      object: '接口',
      desc: '修改接口信息'
    },
    {
      time: '2017-12-06  21:54:46',
      operator: '123asd',
      action: '新增',
      object: '接口',
      desc: '新增接口: 6666'
    },
    {
      time: '2017-12-08  21:54:46',
      operator: '2333',
      action: '删除',
      object: '项目',
      desc: '删除项目: xxx'
    },
    {
      time: '2017-12-07  21:54:46',
      operator: '123asd',
      action: '修改',
      object: '接口',
      desc: '修改接口信息'
    },
    {
      time: '2017-12-06  21:54:46',
      operator: '123asd',
      action: '新增',
      object: '接口',
      desc: '新增接口: 6666'
    },
    {
      time: '2017-12-08  21:54:46',
      operator: '2333',
      action: '删除',
      object: '项目',
      desc: '删除项目: xxx'
    },
    {
      time: '2017-12-07  21:54:46',
      operator: '123asd',
      action: '修改',
      object: '接口',
      desc: '修改接口信息'
    },
    {
      time: '2017-12-06  21:54:46',
      operator: '123asd',
      action: '新增',
      object: '接口',
      desc: '新增接口: 6666'
    }
  ]
  return await data
}
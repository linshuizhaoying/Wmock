// 基础模型列表
export const BaseModelList = async() => {
  console.log('base')
  const data  = [{
    modelName: '字符串',
    modelMode: '"string|1-10": "$"'
  },
  {
    modelName: '数字',
    modelMode: '"number|1-100": 100'
  },
]
  return await data
}

// 自定义模型列表
export const CustomModelList = async(id: string) => {
  console.log(id)
  const data  = [{
    _id: 'model001',
    modelName: 'Wmock - User模型',
    modelDesc: 'Wmock项目的User模型',
    modelMode: '{ "function": function() {return 233}}',
    userId: 'user001',
    userName: '2333'
  },
  {
    _id: 'model002',
    modelName: 'Wmock - Mock模型',
    modelDesc: 'Wmock项目的Mock模型',
    modelMode: '{ "function": function() {return 666}}',
    userId: 'user002',
    userName: '666'
  }
]
  return await data
}
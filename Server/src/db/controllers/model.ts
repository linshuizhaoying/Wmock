const Model = require('../models/model')

// 基础模型列表
export const BaseModelList = async () => {
  console.log('base')
  const data = [{
    modelDataName: '字符串',
    modelMode: '{"string|1-10": "$"}'
  },
  {
    modelDataName: '数字',
    modelMode: '{"number|1-100": 100}'
  },
  {
    modelDataName: '布尔',
    modelMode: '{"boolean|1-2": true}'
  },
  {
    modelDataName: '对象',
    modelMode: '{"object|2": {"310000": "上海市","320000": "江苏省", "330000": "浙江省", "340000": "安徽省"}}'
  },
  {
    modelDataName: '数组',
    modelMode: '{"array|1-10": [{"name|+1": ["Hello","Mock.js", "!" ]} ]}'
  },
  {
    modelDataName: '函数',
    modelMode: '{"foo": "Syntax Demo","name": function() {return this.foo } }'
  },
  {
    modelDataName: '正则',
    modelMode: '{"regexp": /\d{5,10}/}'
  },
  ]
  return await data
}

// 自定义模型列表
export const CustomModelList = async (userId: string) => {
  return await Model.find({ userId: userId })
}

export const AddModel = async (originModel: ModelData) => {
  const newModel = new Model(originModel)
  let result
  await newModel.save(async (error: Error) => {
    if (error) {
      result = error.toString()
    }
  }).then(async (model: ModelData) => {
    result = model._id
  })
  return result
}

export const UpdateModel = async (model: ModelData) => {
  return await Model.update({
    _id: model._id
  }, {
      $set: {
        modelDataName: model.modelDataName,
        modelDesc: model.modelDesc,
        modelMode: model.modelMode,
      }
    })
}

export const RemoveModel = async (id: string) => {
  return Model.remove({
    _id: id
  })
}
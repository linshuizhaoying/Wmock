const Interface = require('../models/interface')

export const FindInterfaceListById = async (interfaceId: string) => {
  return await Interface.find({ _id: interfaceId })
}

export const FindInterfaceById = async (interfaceId: string) => {
  return await Interface.findOne({ _id: interfaceId })
}
export const FindInterfaceByMock = async (projectId: string, url: string, method: string) => {
  return await Interface.findOne({ projectId: projectId, url: url, method: method })

}
// 获取项目Id相同的接口

export const InterfaceList = async (projectId: string) => {
  return await Interface.find({ projectId: projectId, visible: true  })
}

export const RemovedInterfaceList = async () => {
  return await Interface.find({ visible: false })
}

export const CheckInterfaceExist = async (projectId: string, url: string, method: string) => {
  let result
  await Interface.findOne({
    projectId: projectId,
    url: url,
    method: method
  }).then((data: any) => {
    // console.log(data)
    result = data
  })
  return result
}

export const AddInterface = async (interfaceItem: InterfaceData) => {
  const newInterface = new Interface(interfaceItem)
  let result
  await newInterface.save((error: Error) => {
    if (error) {
      result = error.toString()
    }
  }).then((interfaceOne: any) => {
    result = interfaceOne._id
  })
  return result
}

export const RemoveInterface = async (interfaceId: string) => {
  return Interface.update({
    _id: interfaceId
  }, {
    $set: {
      visible: false
    }
  })
}

export const RecoverInterface = async (interfaceId: string) => {
  return Interface.update({
    _id: interfaceId
  }, {
    $set: {
      visible: true
    }
  })
}

export const UpdateInterface = async (interfaceItem: InterfaceData) => {
  return Interface.update({
    _id: interfaceItem._id
  }, {
      $set: {
        desc: interfaceItem.desc,
        url: interfaceItem.url,
        method: interfaceItem.method,
        mode: interfaceItem.mode,
        interfaceName: interfaceItem.interfaceName
      }
    })
}

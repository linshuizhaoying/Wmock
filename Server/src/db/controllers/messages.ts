const Message = require('../models/message')
import { FindProjectListByUserId } from './project'
export const FindMessageByProjectId = async (id: string) => {
  return Message.find({ projectId: id })
}
export const FindMessageByUserId = async (id: string) => {
  return Message.findOne({ masterId: id })
}
export const FindMessageById = async (id: string) => {
  return Message.findOne({ _id: id })
}

export const AllMessages = async (userId: string) => {
  const projectMap = await FindProjectListByUserId(userId)
  console.log('projectList', projectMap)
  const result: any = []
  for (const projectId in projectMap) {
    const projectList = await FindMessageByProjectId(projectId)
    projectList.map(async (item: ProjectData) => {
      result.push(item)
    })

  }
  return result
  // const data = [
  //   {
  //     _id: 'message001',
  //     time: '2017-12-09  21:54:46',
  //     operatorId: 'user001',
  //     operatorName: '小二',
  //     action: 'add', // add update delete invite apply
  //     projectId: 'project001',
  //     objectId: 'project001',
  //     objectName: '项目',
  //     desc: '新增项目: xxx',
  //     userId: 'test001',
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     type: 'normal',  // nomarl || team
  //     readed: false
  //   },
  //   {
  //     _id: 'message002',
  //     time: '2017-12-09  21:54:46',
  //     operatorId: 'user001',
  //     operatorName: '小二',
  //     action: 'update', // add update delete invite apply
  //     projectId: 'project001',
  //     objectId: 'project001',
  //     objectName: '项目',
  //     desc: '更新项目: xxx',
  //     userId: 'test001',
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     type: 'normal',  // nomarl || team
  //     readed: false
  //   },
  //   {
  //     _id: 'message003',
  //     time: '2016-12-09  21:54:46',
  //     operatorId: 'user001',
  //     operatorName: '小二',
  //     action: 'delete', // add update delete invite apply
  //     projectId: 'project001',
  //     objectId: 'project001',
  //     objectName: '项目',
  //     desc: '删除项目: xxx',
  //     userId: 'test001',
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     type: 'normal',  // nomarl || team
  //     readed: false
  //   },
  //   {
  //     _id: 'message004',
  //     time: '2018-12-09  21:54:46',
  //     operatorId: 'user001',
  //     operatorName: '小二',
  //     action: 'invite', // add update delete invite apply
  //     projectId: 'project001',
  //     objectId: 'user001',
  //     objectName: '哈哈哈',
  //     desc: '邀请 哈哈哈 加入 项目团队 Wmock项目',
  //     userId: 'test001',
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     type: 'team',  // nomarl || team
  //     readed: false
  //   },
  //   {
  //     _id: 'message005',
  //     time: '2017-12-07  21:54:46',
  //     operatorId: 'user001',
  //     operatorName: '小二',
  //     action: 'apply', // add update delete invite apply
  //     projectId: 'project002',
  //     objectId: '',
  //     objectName: '',
  //     desc: '小二 申请 加入 项目团队 Wmock项目',
  //     userId: 'test001',
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     type: 'team',  // nomarl || team
  //     readed: false
  //   }
  // ]
  // 暂时返回所有的,实际需要过滤与用户相关的
  // return Message.findOne({})
}

export const AddMessage = async (message: MessageData) => {
  console.log('message', message)
  const newMessage = new Message(message)
  let result
  await newMessage.save(async (error: Error) => {
    if (error) {
      result = error.toString()
    }
  }).then(async (message: Message) => {
    result = message._id
  })
  return result
}

export const UpdateMessage = async (message: Message) => {
  return await Message.update({
    _id: message._id
  }, {
      $set: {
        readed: message.readed,
      }
    })
}

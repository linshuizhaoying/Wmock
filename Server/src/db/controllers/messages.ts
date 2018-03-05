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

export const UpdateMessageReaded = async (message: Message) => {
  return await Message.update({
    _id: message._id
  }, {
      $set: {
        readed: message.readed,
      }
    })
}

import { FindProjectListByUserId } from "./project";
const Message = require("../models/message");
const _ = require("lodash");

export const FindMessageByProjectId = async (id: string) => {
  return Message.find({ projectId: id });
};
export const FindMessageByprojectIdAndObjectId = async (
  projectId: string,
  userId: string
) => {
  return Message.findOne({
    projectId: projectId,
    userId: userId,
    readed: false,
    action: "invite"
  });
};
export const FindMessageByUserId = async (id: string) => {
  return Message.findOne({ masterId: id });
};
export const FindMessageById = async (id: string) => {
  return Message.findOne({ _id: id });
};
export const FindMessageByObjectId = async (objectId: string) => {
  return Message.find({ objectId: objectId, type: "normal" });
};
export const FindMessageByDocumentId = async (documentId: string) => {
  return Message.find({ objectId: documentId });
};

export const AllMessages = async (userId: string) => {
  const projectMap = await FindProjectListByUserId(userId);
  console.log("projectList", projectMap);
  const result: any = [];
  // 找到项目相关的信息
  for (const projectId in projectMap) {
    const projectList = await FindMessageByProjectId(projectId);
    projectList.map(async (item: ProjectData) => {
      result.push(item);
    });
  }
  // 找到操作对象相关的信息
  const objectMessages = await FindMessageByObjectId(userId);
  objectMessages.map((message: MessageData) => {
    result.push(message);
  });
  return await _.uniqBy(result, "_id");
};

export const AddMessage = async (message: MessageData) => {
  console.log("message", message);
  const newMessage = new Message(message);
  let result;
  await newMessage
    .save(async (error: Error) => {
      if (error) {
        result = error.toString();
      }
    })
    .then(async (message: Message) => {
      result = message._id;
    });
  return result;
};

export const DocumentMessages = async (documentId: string) => {
  return await FindMessageByDocumentId(documentId);
};

export const UpdateMessageReaded = async (message: Message) => {
  return await Message.update(
    {
      _id: message._id
    },
    {
      $set: {
        readed: message.readed
      }
    }
  );
};

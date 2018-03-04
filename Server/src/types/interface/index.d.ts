interface Message {
  _id: string,
  time?: Date,
  operatorId: string,
  operatorName: string,
  action: string, // add update delete invite apply
  projectId: string,
  objectId: string,
  objectName: string,
  desc: string,
  userId: string,
  avatar: string,
  type: string,  // normal || team
  readed?: Boolean
}
interface MessageData {
  time?: Date,
  operatorId?: string,
  operatorName: string,
  action?: string, // add update delete invite apply
  projectId?: string,
  objectId?: string,
  objectName?: string,
  desc?: string,
  userId?: string,
  avatar?: string,
  type?: string,  // normal || team
  readed?: Boolean
}
interface UserData {
  _id: string,
  userName: string,
  role: string,
  avatar: string
}
interface RegUser {
  userName: string,
  passWord: string,
  role: string,
  email: string
}
interface UpdateUserData {
  _id: string,
  avatar: string,
  userName: string,
  role: string,
  email: string,
  passWord: string,
}
interface LoginUser {
  userName: string,
  passWord: string
}

interface Result {
  status: string,
  userId: string,
  userName: string,
  msg: string,
  avatar: string,
  email: string,
  regDate: Date,
  role: string
}

interface ProjectData {
  _id?: string,
  projectName?: string,
  projectUrl?: string,
  projectDesc?: string,
  version?: string,
  transferUrl?: string,
  status?: string,
  type?: string,
  masterId?: string
  teamMember?: Array<UserData>
}

interface TeamData {
  _id?: string,
  masterAvatar: string,
  masterId: string,
  role: string,
  masterName: string,
  projectId: string,
  projectName: string,
  member: Array<{
    _id: string,
    userName: string,
    role: string,
    avatar: string
  }>,
}
interface Project {
  _id?: string,
  projectName?: string,
  projectUrl?: string,
  projectDesc?: string,
  version?: string,
  transferUrl?: string,
  status?: string,
  type?: string,
  teamMember?: Array<any>,
  interfaceList: Array<any>,
  masterId?: string
}
interface Interface {
  _id?: string,
  interfaceName?: string,
  url?: string,
  method?: string,
  desc?: string,
  mode?: string,
}


interface InterfaceData {
  _id?: string,
  projectId: string,
  interfaceName: string,
  url: string,
  method: string,
  desc: string,
  mode: string,
}
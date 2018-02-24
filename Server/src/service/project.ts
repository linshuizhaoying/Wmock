import {
  AddProject,
  AddTeam,
  DemoProject,
  FindTeamByProjectId,
  FindUserById,
  UnJoinProjectList,
  UserProject
} from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';
const _ = require('lodash')
const field = require('../db/models/field')
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


export const userProjectList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  console.log(userId)
  const { userName } = ctx.request.body;
  const result = await UserProject(userId)
  return ctx.body = success(result, '获取成功')
}

export const demoProjectList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const result: Array<ProjectData> = []

  // 获取项目信息
  const projectList = await DemoProject(userId)
  await Promise.all(projectList.map(async (oldItem: ProjectData) => {
    // 先洗下数据
    const item = _.pick(oldItem, field.projectField)
    // 获取团队信息

    const team = await FindTeamByProjectId(item._id)
    const temp = {
      _id: '',
      userName: '',
      role: '',
      avatar: ''
    }
    temp._id = team.masterId
    temp.avatar = team.masterAvatar
    temp.role = team.role
    temp.userName = team.masterName
    const teamMember: Array<UserData> = []
    // 团队列表加入创始者
    teamMember.push(temp)
    // 团队列表加入成员
    await team.member.map((member: UserData) => {
      temp._id = member._id
      temp.avatar = member.avatar
      temp.role = member.role
      temp.userName = member.userName
      teamMember.push(temp)
    })

    const fullProject = item
    fullProject['teamMember'] = await teamMember
    result.push(fullProject)
    return fullProject
  }))
  console.log('result', result)

  // 获取对应接口信息

  return ctx.body = success(result, '获取成功')
}

export const unJoinProjectList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const result = await UnJoinProjectList(userId)
  // console.log(result)
  return ctx.body = success(result, '获取成功')
}

export const addProject = async (ctx: any) => {
  // 添加项目
  const { userId } = ctx.tokenContent;
  const project: Project = ctx.request.body;
  const projectName = ctx.checkBody('projectName').notEmpty().len(1, 32).value
  const projectUrl = ctx.checkBody('projectUrl').notEmpty().len(1, 20).value
  const projectDesc = ctx.checkBody('projectDesc').notEmpty().len(1, 20).value
  const type = ctx.checkBody('type').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,添加失败!')
  }
  project.masterId = userId
  const result = await AddProject(project)

  // 添加对应团队
  const team: TeamData = {
    masterAvatar: '',
    masterId: '',
    role: '',
    masterName: '',
    projectId: '',
    projectName: '',
    member: []
  }
  const user = await FindUserById(userId)

  team.masterAvatar = user.avatar
  team.masterId = user._id
  team.role = user.role
  team.masterName = user.userName
  team.projectId = result
  team.projectName = projectName
  await AddTeam(team)
  return ctx.body = success({}, '添加项目成功!')
}


export const updateProject = async (ctx: any) => {
  const project: Project = ctx.request.body;
  console.log(project)
  return ctx.body = success({}, '更新成功!')
}

export const removeProject = async (ctx: any) => {
  const project: Project = ctx.request.body;
  console.log(project)
  return ctx.body = success({}, '删除成功!')
}


export const importProject = async (ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success({}, '导入成功!')
}

export const cloneProject = async (ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success({}, '克隆成功!')
}

export const cloneInterface = async (ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success({}, '克隆成功!')
}


export const verifyProject = async (ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success({
    result: 'no',
    data: [
      {
        'interfaceName': 'token',
        'expect': '{data:2333}',
        'actual': '{xxx:222}',
        'compare': 'mismatch'
      }, {
        'interfaceName': '注册',
        'expect': '{data:2333}',
        'actual': '{data:222}',
        'compare': 'match'
      }, {
        'interfaceName': '登录',
        'expect': '{ccc:2333}',
        'actual': '{ccc:123asd123}',
        'compare': 'match'
      }
    ]
  }, '验证成功')
}

export const addInterface = async (ctx: any) => {
  const interfaceData: Interface = ctx.request.body;
  console.log(interfaceData)
  return ctx.body = success({}, '添加成功!')
}


export const updateInterface = async (ctx: any) => {
  const interfaceData: Interface = ctx.request.body;
  console.log(interfaceData)
  return ctx.body = success({}, '更新成功!')
}

export const removeInterface = async (ctx: any) => {
  const interfaceData: Interface = ctx.request.body;
  console.log(interfaceData)
  return ctx.body = success({}, '删除成功!')
}

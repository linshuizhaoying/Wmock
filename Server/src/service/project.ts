import {
  AddProject,
  AddTeam,
  DemoProject,
  FindProjectById,
  FindTeamByProjectId,
  FindUserById,
  UnJoinProjectList,
  UserProject,
  InterfaceList,
  RemoveProject,
  UpdateProject,
  RemoveInterface
} from '../db/controllers/index';
import { cloneInterfaceItem } from './interface'
import { error, success } from '../utils/dataHandle';
const _ = require('lodash')
const field = require('../db/models/field')

const getProjectList = async (projectList: Array<ProjectData>) => {
  const result: Array<ProjectData> = []
  await Promise.all(projectList.map(async (oldItem: ProjectData) => {
    // 洗下项目数据
    const item = _.pick(oldItem, field.projectField)
    // 获取团队信息
    const team = await FindTeamByProjectId(item._id)
    // 获取对应接口信息
    const interfaceOldData = await InterfaceList(item._id)
    // 洗下接口数据
    const interfaceList = interfaceOldData.map((item: InterfaceData) => _.pick(item, field.interfaceField))
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
    fullProject['interfaceList'] = await interfaceList
    result.push(fullProject)
    return fullProject
  }))
  // 对名称做个排序
  result.sort((a: ProjectData, b: ProjectData) => {
    return a.projectName < b.projectName ? -1 : 1
  })
  return result
}
export const userProjectList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  let result: Array<ProjectData> = []
  // 获取项目信息
  const projectList = await UserProject(userId)
  result = await getProjectList(projectList)
  return ctx.body = success(result, '获取成功')
}

export const demoProjectList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  let result: Array<ProjectData> = []
  // 获取项目信息
  const projectList = await DemoProject(userId)
  result = await getProjectList(projectList)
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
  const _id = ctx.checkBody('_id').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,更新失败!')
  }
  const currentProject = await FindProjectById(_id)

  // 如果不是格式正常或者不是正在修改的属性,则保留原先数据
  currentProject.projectName = project.projectName || currentProject.projectName
  currentProject.projectUrl = project.projectUrl || currentProject.projectUrl
  currentProject.projectDesc = project.projectDesc || currentProject.projectDesc
  currentProject.version = project.version || currentProject.version
  currentProject.transferUrl = project.transferUrl || currentProject.transferUrl
  currentProject.status = project.status || currentProject.status
  currentProject.type = project.type || currentProject.type
  currentProject.masterId = project.masterId || currentProject.masterId
  console.log(currentProject)
  const result = await UpdateProject(currentProject)
  return ctx.body = success(result, '更新成功!')
}

export const removeProject = async (ctx: any) => {
  const project: Project = ctx.request.body;
  const id = ctx.checkBody('id').notEmpty().value
  if (ctx.errors) {
    return ctx.body = error('用户数据不正常,删除失败!')
  }
  // 先批量删除对应项目下的接口
  const interfaceListData = await InterfaceList(id)
  await interfaceListData.map(async (item: InterfaceData) => await RemoveInterface(item._id))

  const result = await RemoveProject(id)

  return ctx.body = success({}, '删除成功!')
}


export const importProject = async (ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success({}, '导入成功!')
}

/**
 * 项目的克隆不再是和接口一样简单的新建一个接口然后把原接口内容复制过去
 * 因为项目其实包含了不少数组信息,不过克隆项目只需要把里面的接口信息一并克隆即可，
 * 里面的团队信息是不需要的。
 * 因此需要调用cloneInterface接口来批量更改接口
 */
export const cloneProject = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const { projectId, type } = ctx.request.body;
  const vaildProjectId = ctx.checkBody('projectId').notEmpty().value
  if (ctx.errors) {
    return ctx.body = error('用户数据不正常,克隆失败!')
  }
  const oldProject = await FindProjectById(projectId)
  const newProject = {
    projectName: oldProject.projectName,
    projectUrl: oldProject.projectUrl,
    projectDesc: oldProject.projectDesc,
    version: oldProject.version,
    transferUrl: oldProject.transferUrl,
    status: oldProject.status,
    type: type,
    masterId: userId
  }
  const newProjectId = await AddProject(newProject)
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
  team.projectId = newProjectId
  team.projectName = oldProject.projectName
  await AddTeam(team)

  // 获取旧项目的接口信息
  const interfaceListData = await InterfaceList(projectId)
  // 批量克隆接口到新项目上
  await interfaceListData.map(async (item: InterfaceData) => await cloneInterfaceItem(newProjectId, item._id))

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
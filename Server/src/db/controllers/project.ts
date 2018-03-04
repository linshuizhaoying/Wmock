
const Project = require('../models/project')
import { FindTeamByProjectId } from './team'

export const FindProjectListByUserId = async (userId: string) => {
  const allProject = await Project.find({})
  // 返回与用户相关的所有项目
  const relatedProjectMap: any = new Map()
  await Promise.all(allProject.map(async (oldItem: ProjectData) => {
    // 先添加自己创建的项目
    if (userId === oldItem.masterId) {
      relatedProjectMap[oldItem._id] = true
    }
    let found = false
    // 对不是自己创建的项目进行判断
    if (userId !== oldItem.masterId) {
      // 找到对应的团队
      const projectTeam: TeamData = await FindTeamByProjectId(oldItem._id)
      await projectTeam.member.map(async (user: UserData) => {
        // 如果对应的团队里面有该用户，则加入相关的项目列表
        if (user._id === userId) {
          found = true
        }
      })
      if (found) {
        relatedProjectMap[oldItem._id] = true
      }
    }
  }))
  return relatedProjectMap
}

export const FindProjectById = async (projectId: string) => {
  return await Project.findOne({ _id: projectId })
}


export const DemoProject = async (userId: string) => {
  return await Project.find({ masterId: userId, type: 'demo' })
}

export const UserProject = async (userId: string) => {
  return await Project.find({ masterId: userId, type: 'user' })
}

export const UnJoinProjectList = async (userId: string) => {
  console.log(userId)
  const allProject = await Project.find({})
  const unJoinList: ProjectData[] = []
  await Promise.all(allProject.map(async (oldItem: ProjectData) => {
    let found = false
    // 先找到不是自己创建的项目
    if (userId !== oldItem.masterId) {

      // 找到对应的团队
      const projectTeam: TeamData = await FindTeamByProjectId(oldItem._id)
      await projectTeam.member.map(async (user: UserData) => {
        // 如果对应的团队里面也没有该用户，说明是未加入的团队
        if (user._id === userId) {
          found = true
        }
      })
      if (!found) {
        const result = {
          projectId: '',
          projectName: ''
        }
        result.projectId = oldItem._id
        result.projectName = oldItem.projectName
        unJoinList.push(result)
      }
    }
  }))

  console.log('自己未加入的团队', unJoinList)
  return unJoinList
}

export const AddProject = async (originProject: ProjectData) => {
  const newProject = new Project(originProject)
  let result
  await newProject.save(async (error: Error) => {
    if (error) {
      result = error.toString()
    }
  }).then(async (project: ProjectData) => {
    result = project._id
    // 如果不是导入的
    if (!originProject.version) {
      const newProject = project
      newProject.transferUrl = project.transferUrl + '/' + project._id
      await UpdateProject(newProject)
    }

  })
  return result
}

export const UpdateProject = async (project: ProjectData) => {
  return Project.update({
    _id: project._id
  }, {
      $set: {
        projectName: project.projectName,
        projectUrl: project.projectUrl,
        projectDesc: project.projectDesc,
        version: project.version,
        transferUrl: project.transferUrl,
        status: project.status,
        type: project.type
      }
    })
}

export const RemoveProject = async (id: string) => {
  return Project.remove({
    _id: id
  })
}

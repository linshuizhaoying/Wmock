
const Project = require('../models/project')

export const DemoProject = async (userId: string) => {
  return await Project.find({ masterId: userId, type: 'demo' })
}

export const UserProject = async (userId: string) => {
  return await Project.find({ masterId: userId, type: 'user' })
}

export const UnJoinProjectList = async (id: string) => {
  console.log(id)
  const data = [
    {
      projectId: 'proejct110',
      projectName: '尚未加入的项目001',
    },
    {
      projectId: 'proejct111',
      projectName: '尚未加入的项目002',
    },
    {
      projectId: 'proejct112',
      projectName: '尚未加入的项目003',
    }
  ]
  return await data
}

export const AddProject = async (project: ProjectData) => {
  const newProject = new Project(project)
  let result
  await newProject.save((error: Error) => {
    if (error) {
      result = error.toString()
    }
  }).then((project: any) => {
    result = project._id
  })
  return result
}

export const UpdateProject = async (project: ProjectData) => {

}

export const RemoveProject = async (id: string) => {

}

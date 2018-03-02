
const Project = require('../models/project')

export const FindProjectById = async (projectId: string) => {
  return await Project.findOne({ _id: projectId })
}


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
  await newProject.save(async (error: Error) => {
    if (error) {
      result = error.toString()
    }
  }).then(async (project: ProjectData) => {
    result = project._id
    const newProject = project
    newProject.transferUrl = project.transferUrl + '/' + project._id
    await UpdateProject(newProject)
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

import { UserProject, DemoProject, UnJoinProjectList } from '../db/controllers/index';


interface Project {
  _id?: String,
  projectName?: String,
  projectUrl?: String,
  projectDesc?: String,
  version?: String,
  transferUrl?: String,
  status?: String,
  type?: String,
  teamMember?: Array<any>,
  interfaceList: Array<any>,
}
interface Interface {
  _id?: String,
  interfaceName?: String,
  url?: String,
  method?: String,
  desc?: String,
  mode?: String,
}

// 返回正常数据
const success = ( data: any) => {
  return {
    'state': {
        'code': 1,
        'msg': 'success'
    },
    'data': {
       data
    }
 }
}
// // 返回错误提醒
// const error = () => {
//   return{
//     'state': {
//         'code': 2,
//         'msg':  'error'
//     }
//   }
// }


export const userProjectList = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  const { username } = ctx.request.body;
  const result = await UserProject(username)
  // console.log(result)
  return ctx.body = success(result)
}

export const demoProjectList = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  const { username } = ctx.request.body;
  const result = await DemoProject(username)
  // console.log(result)
  return ctx.body = success(result)
}

export const unJoinProjectList = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  const { id } = ctx.request.body;
  const result = await UnJoinProjectList(id)
  // console.log(result)
  return ctx.body = success(result)
}

export const addProject = async(ctx: any) => {
  const project: Project = ctx.request.body;
  console.log(project)
  return ctx.body = success('添加成功!')
}


export const updateProject = async(ctx: any) => {
  const project: Project = ctx.request.body;
  console.log(project)
  return ctx.body = success('更新成功!')
}

export const removeProject = async(ctx: any) => {
  const project: Project = ctx.request.body;
  console.log(project)
  return ctx.body = success('删除成功!')
}


export const importProject = async(ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success('导入成功!')
}

export const cloneProject = async(ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success('克隆成功!')
}

export const cloneInterface = async(ctx: any) => {
  const { data } = ctx.request.body;
  console.log(data)
  return ctx.body = success('克隆成功!')
}


export const verifyProject = async(ctx: any) => {
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

  })
}

export const addInterface = async(ctx: any) => {
  const interfaceData: Interface = ctx.request.body;
  console.log(interfaceData)
  return ctx.body = success('添加成功!')
}


export const updateInterface = async(ctx: any) => {
  const interfaceData: Interface = ctx.request.body;
  console.log(interfaceData)
  return ctx.body = success('更新成功!')
}

export const removeInterface = async(ctx: any) => {
  const interfaceData: Interface = ctx.request.body;
  console.log(interfaceData)
  return ctx.body = success('删除成功!')
}

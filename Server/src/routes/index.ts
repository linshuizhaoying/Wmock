import * as Irouter from 'koa-router';
import * as Service from '../service';
import tokenPermission from '../middleware/token';
import { config } from '../config';

const path = require('path');
const middleware = require('../middleware/index')
const router = new Irouter()

export const Router = (app: any) => {
  const {
    reg,
    login,
    tokenLogin,
    userInfo,
    updateUser,

    messagesList,

    userProjectList,
    demoProjectList,
    allProjectList,

    documentList,
    documentMessages,
    removeDocument,
    addDocument,
    updateDocument,
    uploadFile,

    teamList,
    sendApply,
    allowedJoinGroup,
    rejectJoinGroup,
    removeGroupMember,
    invitedGroupMember,

    mock,
    unJoinProjectList,
    addProject,
    removeProject,
    updateProject,
    importProject,
    cloneProject,
    verifyProject,
    addInterface,
    removeInterface,
    updateInterface,
    cloneInterface,


    baseModelList,
    customModelList,
    addModel,
    updateModel,
    removeModel,

  } = Service

  router.post('/api/reg', Service.reg)
    .post('/api/login', Service.login)
    // .get('/api/userInfo', tokenPermission, Service.userInfo)
    .get('/api/userInfo', tokenPermission, Service.userInfo)
    // 用于持久化登录,只要auth头有未过期的token验证就能证明用户的登录状态
    .get('/api/token', tokenPermission, Service.tokenLogin)
    // 更新用户信息
    .post('/api/updateUser', tokenPermission, Service.updateUser)
    .get('/api/messagesList', tokenPermission, Service.messagesList)

    // 获取所有项目列表
    .get('/api/allProjectList', tokenPermission, Service.allProjectList)
    // 获取示例项目列表
    .get('/api/demoList', tokenPermission, Service.demoProjectList)
    // 获取用户项目列表
    .get('/api/projectList', tokenPermission, Service.userProjectList)
    // 获取未加入的项目列表
    .get('/api/unJoinProjectList', tokenPermission, Service.unJoinProjectList)
    // 添加项目
    .post('/api/addProject', tokenPermission, Service.addProject)
    // 更新项目
    .post('/api/updateProject', tokenPermission, Service.updateProject)
    // 删除项目
    .post('/api/removeProject', tokenPermission, Service.removeProject)
    // 导入项目
    .post('/api/importProject', tokenPermission, Service.importProject)
    // 克隆项目
    .post('/api/cloneProject', tokenPermission, Service.cloneProject)
    // 克隆接口
    .post('/api/cloneInterface', tokenPermission, Service.cloneInterface)
    // 校验项目
    .post('/api/verifyProject', tokenPermission, Service.verifyProject)
    // 添加接口
    .post('/api/addInterface', tokenPermission, Service.addInterface)
    // 更新接口
    .post('/api/updateInterface', tokenPermission, Service.updateInterface)
    // 删除接口
    .post('/api/removeInterface', tokenPermission, Service.removeInterface)

    // 获取团队列表
    .get('/api/teamList', tokenPermission, Service.teamList)
    // 申请加入团队
    .post('/api/sendApply', tokenPermission, Service.sendApply)
    // 允许加入团队
    .post('/api/allowedJoinGroup', tokenPermission, Service.allowedJoinGroup)
    // 拒绝加入团队
    .post('/api/rejectJoinGroup', tokenPermission, Service.rejectJoinGroup)
    // 将用户移除团队
    .post('/api/removeGroupMember', tokenPermission, Service.removeGroupMember)
    // 邀请用户加入团队
    .post('/api/invitedGroupMember', tokenPermission, Service.invitedGroupMember)


    // 获取文档列表
    .get('/api/documentList', tokenPermission, Service.documentList)
    // 获取文档历史信息
    .post('/api/documentMessages', tokenPermission, Service.documentMessages)
    // 添加文档
    .post('/api/addDocument', tokenPermission, Service.addDocument)
    // 更新文档
    .post('/api/updateDocument', tokenPermission, Service.updateDocument)
    // 删除文档
    .post('/api/removeDocument', tokenPermission, Service.removeDocument)

    // 获取Mock模型
    .get('/api/baseModelList', tokenPermission, Service.baseModelList)
    .get('/api/customModelList', tokenPermission, Service.customModelList)
    // 添加Mock模型
    .post('/api/addModel', tokenPermission, Service.addModel)
    // 更新Mock模型
    .post('/api/updateModel', tokenPermission, Service.updateModel)
    // 删除Mock模型
    .post('/api/removeModel', tokenPermission, Service.removeModel)

    // 图片上传
    .post('/api/upload', async (ctx, next) => {
      let result = {}
      const serverFilePath = path.join(__dirname, '../images')
      // 上传文件事件
      result = await uploadFile(ctx, {
        fileType: 'up', // common or album
        path: serverFilePath
      })
      console.log(result)
      ctx.body = result
    });

  // 根据对应请求返回 mock数据
  router.use('/mock', middleware.mockFilter, Service.mock)
  router.all('/*', async (ctx, next) => {
    ctx.body = {
      'state': {
        'code': 404,
        'msg': 'error'
      },
      'data': undefined
    }
  })

  app.use(router.routes())

}

export default Router
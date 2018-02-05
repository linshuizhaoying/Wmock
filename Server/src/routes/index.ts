import * as Irouter from 'koa-router';
import tokenPermission from '../middleware/token'
import * as Service from '../service';

import { config } from '../config'
const path = require('path');
const middleware = require('../middleware/index')
const router = new Irouter()

export const Router = (app: any) => {
  const { reg,
          login,
          tokenLogin,
          userInfo,
          messagesList,
          userProjectList,
          demoProjectList,

          documentList,
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

          baseModelList,
          customModelList,
          addModel,
          updateModel,
          removeModel,

        } = Service

  router.post('/api/reg', Service.reg)
        .post('/api/login', Service.login)
        // .get('/api/userInfo', tokenPermission, Service.userInfo)
        .get('/api/userInfo', Service.userInfo)
        // 用于持久化登录,只要auth头有未过期的token验证就能证明用户的登录状态
        .post('/api/token', Service.tokenLogin)
        .get('/api/messagesList', Service.messagesList)

        // 获取示例项目列表
        .post('/api/demoList', Service.demoProjectList)
        // 获取用户项目列表
        .post('/api/projectList', Service.userProjectList)
        // 获取未加入的项目列表
        .post('/api/unJoinProjectList', Service.unJoinProjectList)
        // 添加项目
        .post('/api/addProject', Service.addProject)
        // 更新项目
        .post('/api/updateProject', Service.updateProject)
        // 删除项目
        .post('/api/removeProject', Service.removeProject)
        // 导入项目
        .post('/api/importProject', Service.importProject)
        // 克隆项目
        .post('/api/cloneProject', Service.cloneProject)
        // 校验项目
        .post('/api/verifyProject', Service.verifyProject)

        // 获取团队列表
        .post('/api/teamList', Service.teamList)
        // 申请加入团队
        .post('/api/sendApply', Service.sendApply)
        // 允许加入团队
        .post('/api/allowedJoinGroup', Service.allowedJoinGroup)
        // 拒绝加入团队
        .post('/api/rejectJoinGroup', Service.rejectJoinGroup)
        // 将用户移除团队
        .post('/api/removeGroupMember', Service.removeGroupMember)
        // 邀请用户加入团队
        .post('/api/invitedGroupMember', Service.invitedGroupMember)


        // 获取文档列表
        .post('/api/documentList', Service.documentList)
        // 添加文档
        .post('/api/addDocument', Service.addDocument)
        // 更新文档
        .post('/api/updateDocument', Service.updateDocument)
        // 删除文档
        .post('/api/removeDocument', Service.removeDocument)

        // 获取Mock模型
        .get('/api/baseModelList', Service.baseModelList)
        .post('/api/customModelList', Service.customModelList)
        // 添加Mock模型
        .post('/api/addModel', Service.addModel)
        // 更新Mock模型
        .post('/api/updateModel', Service.updateModel)
        // 删除Mock模型
        .post('/api/removeModel', Service.removeModel)

        // 图片上传
        .post('/api/upload', async (ctx, next) => {
          let result = {}
          const serverFilePath = path.join( __dirname, '../images' )
          // 上传文件事件
          result = await uploadFile( ctx, {
            fileType: 'up', // common or album
            path: serverFilePath
          })
          console.log(result)
          ctx.body = result
        });

  // 根据对应请求返回 mock数据
  router.use('/mock', middleware.mockFilter, Service.mock)
  router.all('/*',  async (ctx, next) => {
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
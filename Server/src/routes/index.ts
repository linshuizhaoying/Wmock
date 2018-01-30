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
          uploadFile,
          teamList,
          sendApply,
          mock,
          unJoinProjectList,
          baseModelList,
          customModelList
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
        // 获取团队列表
        .post('/api/teamList', Service.teamList)
        // 申请加入团队
        .post('/api/sendApply', Service.sendApply)
        // 获取文档列表
        .post('/api/documentList', Service.documentList)
        // 获取Mock模型
        .get('/api/baseModelList', Service.baseModelList)
        .post('/api/customModelList', Service.customModelList)
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
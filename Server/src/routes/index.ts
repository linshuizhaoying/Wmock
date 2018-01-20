import * as Irouter from 'koa-router';
import tokenPermission from '../middleware/token'
import * as Service from '../service';

import { config } from '../config'
const path = require('path');

const router = new Irouter()

export const Router = (app: any) => {
  const { reg,
          login,
          tokenLogin,
          userInfo,
          messagesList,
          projectList,
          mock,
          documentList,
          uploadFile
        } = Service

  router.post('/api/reg', Service.reg)
        .post('/api/login', Service.login)
        // .get('/api/userInfo', tokenPermission, Service.userInfo)
        .get('/api/userInfo', Service.userInfo)
        // 用于持久化登录,只要auth头有未过期的token验证就能证明用户的登录状态
        .post('/api/token', Service.tokenLogin)
        .get('/api/messagesList', Service.messagesList)
        // 获取项目列表
        .post('/api/projectList', Service.projectList)
        // 获取文档列表
        .post('/api/documentList', Service.documentList)
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
  router.use('/mock/:project/:interface', Service.mock)
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
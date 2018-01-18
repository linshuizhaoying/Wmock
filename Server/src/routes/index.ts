import * as Irouter from 'koa-router';
import tokenPermission from '../middleware/token'
import * as Service from '../service';

import { config } from '../config'


const router = new Irouter()

export const Router = (app: any) => {
  const { reg,
          login,
          tokenLogin,
          userInfo,
          messagesList,
          projectList,
          mock,
          documentList
        } = Service

  router.post('/api/reg', Service.reg)
        .post('/api/login', Service.login)
        .get('/api/userInfo', tokenPermission, Service.userInfo)
        // 用于持久化登录,只要auth头有未过期的token验证就能证明用户的登录状态
        .post('/api/token', Service.tokenLogin)
        .get('/api/messagesList', Service.messagesList)
        // 获取项目列表
        .post('/api/projectList', Service.projectList)
        // 获取文档列表
        .post('/api/documentList', Service.documentList)
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
import * as Irouter from 'koa-router';
import tokenPermission from '../middleware/token'
import * as Service from '../service';

import { config } from '../config'

// 前缀路由 /api
const router = new Irouter({prefix: config.app.baseApi})

export const Router = (app: any) => {
  const { reg,
          login,
          tokenLogin,
          userInfo,
          messagesList,
          projectList
        } = Service

  router.post('/reg', Service.reg)
        .post('/login', Service.login)
        .get('/userInfo', tokenPermission, Service.userInfo)
        // 用于持久化登录,只要auth头有未过期的token验证就能证明用户的登录状态
        .post('/token', Service.tokenLogin)
        .get('/messagesList', Service.messagesList)
        // 获取项目列表
        .post('/projectList', Service.projectList)
  router.all('/*',  async (ctx, next) => {
    ctx.body = '404'
  })

 app.use(router.routes())

}

export default Router
import * as jwt from 'jsonwebtoken'
import { config } from '../config'

export default async(ctx: any, next: any) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, '在http头中没有检测到Authorization')
  }
  let tokenContent
  try {
    tokenContent = await jwt.verify(authorization, config.app.keys)
  } catch (err) {
    if ('TokenExpiredError' === err.name) {
      ctx.throw(401, 'token过期,请及时本地保存数据！')
    }
    ctx.throw(401, '无效的token')
  }
  // 将token解析的数据传递到下一个中间层、
  ctx.token = authorization
  ctx.tokenContent = tokenContent
  await next()
}

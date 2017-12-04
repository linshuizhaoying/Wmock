import * as jwt from 'jsonwebtoken'
import { config } from '../config'

export default async(ctx: any, next: any) => {
  console.log(ctx.get('Authorization'))
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, '在http头中没有检测到Authorization')
  }
  const token = authorization.split(' ')[1]
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, config.app.keys)
  } catch (err) {
    if ('TokenExpiredError' === err.name) {
      ctx.throw(401, 'token过期,请及时本地保存数据！')
    }
    ctx.throw(401, '无效的token')
  }
  console.log('鉴权成功')
  console.log(tokenContent)
  ctx.tokenContent = tokenContent
  await next()
}

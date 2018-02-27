import { error, success } from '../utils/dataHandle';
// import { AllProject } from '../db/controllers/index';
import {
  FindInterfaceByMock
} from '../db/controllers/index';
const { VM } = require('vm2')
const Mock = require('mockjs')

export const mock = async (ctx: any) => {
  const method = ctx.request.method.toLowerCase()
  // 获取接口路径内容
  const { projectId, mockURL } = ctx.pathNode
  const findMock = await FindInterfaceByMock(projectId, mockURL.replace('/', ''))
  console.log('findMock', findMock)
  console.log('method', findMock.method)
  // 如果请求的Method不符合设定
  if (findMock.method !== method) {
    return ctx.body = error('请求方法错误,请重试')
  }
  // 模拟数据
  Mock.Handler.function = function (options: any) {
    options.Mock = Mock
    // 传入 request cookies，方便使用
    options._req = ctx.request
    return options.template.call(options.context.currentContext, options)
  }

  // const findMock.mode = `{success :true, data: { default: "hah", _req: function({ _req }) { return _req }, name: function({ _req }) { return _req.query.name || this.default }}}`
  const temp = JSON.stringify(findMock.mode)
  const vm = new VM({
    timeout: 1000,
    sandbox: {
      Mock: Mock,
      mode: findMock.mode,
      template: new Function(`return ${findMock.mode}`)
    }
  })
  vm.run('Mock.mock(new Function("return " + mode)())') // 数据验证，检测 setTimeout 等方法, 顺便将内部的函数执行了
  // console.log(Mock.Handler.function(new Function('return ' + findMock.mode)()))
  const apiData = vm.run('Mock.mock(template())')
  console.log('apiData2333', apiData)

  const result = success( apiData , '返回成功')

  // console.log(result)
  return ctx.body = result
}
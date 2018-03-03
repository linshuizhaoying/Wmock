import { error, mockSuccess } from '../utils/dataHandle';
// import { AllProject } from '../db/controllers/index';
import {
  FindInterfaceByMock,
  FindProjectById
} from '../db/controllers/index';
const { VM } = require('vm2')
const Mock = require('mockjs')
const axios = require('axios')

export const getRemoteData = async (method: string, url: string, query: string = '', body: string = '') => {
  let result = ''
  try {
    const apiData = await axios({
      method: method,
      url: url,
      params: Object.assign({}, query),
      data: body,
      timeout: 3000
    }).then((res: any) => {
      return res.data
    })
    result = apiData
  } catch (error) {
    result = ''
  }
  return result
}

export const mock = async (ctx: any) => {
  const { query, body } = ctx.request
  console.log('query', query)
  console.log('body', body)
  const method = ctx.request.method.toLowerCase()
  // 获取接口路径内容
  const { projectId, mockURL } = ctx.pathNode
  const foundMock = await FindInterfaceByMock(projectId, mockURL.replace('/', ''), method)
  const foundProject: ProjectData = await FindProjectById(projectId)
  // 如果请求的Method不符合设定
  if (!foundMock) {
    return ctx.body = error('请求参数错误,请重试')
  }

  let result: any = undefined

  // 确定项目转发状态,
  // 如果是平台mock,返回 匹配的数据
  // 如果是接口转发,那么在转发地址上加上指定的接口名

  if (foundProject.status === 'mock') {
    // 模拟数据
    Mock.Handler.function = function (options: any) {
      options.Mock = Mock
      // 传入 request cookies，方便使用
      options._req = ctx.request
      return options.template.call(options.context.currentContext, options)
    }

    const temp = JSON.stringify(foundMock.mode)
    const vm = new VM({
      timeout: 1000,
      sandbox: {
        Mock: Mock,
        mode: foundMock.mode,
        template: new Function(`return ${foundMock.mode}`)
      }
    })
    vm.run('Mock.mock(new Function("return " + mode)())') // 数据验证，检测 setTimeout 等方法, 顺便将内部的函数执行了
    const apiData = vm.run('Mock.mock(template())')
    console.log('apiData:', apiData)
    result = mockSuccess(apiData)
  } else if (foundProject.status === 'transfer') {
    // 如果代理成自己,会造成无限循环，因此一开始就判断然后拒绝代理
    if (foundProject.transferUrl.indexOf(projectId) > -1 && mockURL.replace('/', '') === foundMock.url) {
      return ctx.body = error('接口无法转发自身!')
    } else {
      result = await getRemoteData(foundMock.method, foundProject.transferUrl + '/' + foundMock.url, query, body)
      console.log('final result:', result)
      if (result === '') {
        ctx.body = {
          'state': {
            'code': 500,
            'msg': '转发请求出错,请检查转发服务是否正常!'
          },
          'data': undefined
        }
        return
      }
      // try {
      //   console.log(foundProject.transferUrl + '/' + foundMock.url)
      //   const apiData = await axios({
      //     method: foundMock.method,
      //     url: foundProject.transferUrl + '/' + foundMock.url,
      //     params: Object.assign({}, query),
      //     data: body,
      //     timeout: 3000
      //   }).then((res: any) => {
      //     return res.data
      //   })
      //   result = apiData
      // } catch (error) {
      //   ctx.body = {
      //     'state': {
      //       'code': 500,
      //       'msg': '转发请求出错,请检查转发服务是否正常!'
      //     },
      //     'data': undefined
      //   }
      //   return
      // }
    }
  }
  return ctx.body = result

}
// import { AllProject } from '../db/controllers/index';
const { VM } = require('vm2')
const Mock = require('mockjs')
import { error, success } from '../utils/dataHandle';

export const mock = async(ctx: any) => {
  const method = ctx.request.method.toLowerCase()
  // let { projectId, mockURL } = ctx.pathNode
  // 获取接口路径内容
  console.log('ctx.pathNode', ctx.pathNode)
  // 匹配内容是否一致
  console.log('验证内容中...')
  // 模拟数据
  Mock.Handler.function = function (options: any) {
    console.log('start Handle')
    options.Mock = Mock
    // 传入 request cookies，方便使用
    options._req = ctx.request
    return options.template.call(options.context.currentContext, options)
  }
  console.log('Mock.Handler', Mock.Handler.function)
  const testMode = `{
    'title': 'Syntax Demo',
    'string1|1-10': '★',
    'string2|3': 'value',
    'number1|+1': 100,
    'number2|1-100': 100,
    'number3|1-100.1-10': 1,
    'number4|123.1-10': 1,
    'number5|123.3': 1,
    'number6|123.10': 1.123,
    'boolean1|1': true,
    'boolean2|1-2': true,
    'object1|2-4': {
        '110000': '北京市',
        '120000': '天津市',
        '130000': '河北省',
        '140000': '山西省'
    },
    'object2|2': {
        '310000': '上海市',
        '320000': '江苏省',
        '330000': '浙江省',
        '340000': '安徽省'
    },
    'array1|1': ['AMD', 'CMD', 'KMD', 'UMD'],
    'array2|1-10': ['Mock.js'],
    'array3|3': ['Mock.js'],
    'function': function() {
        return this.title
    }
}`
// const testMode = `{success :true, data: { default: "hah", _req: function({ _req }) { return _req }, name: function({ _req }) { return _req.query.name || this.default }}}`
const temp = JSON.stringify(testMode)
  const vm = new VM({
    timeout: 1000,
    sandbox: {
      Mock: Mock,
      mode: testMode,
      template: new Function(`return ${testMode}`)
    }
  })
  vm.run('Mock.mock(new Function("return " + mode)())') // 数据验证，检测 setTimeout 等方法, 顺便将内部的函数执行了
  // console.log(Mock.Handler.function(new Function('return ' + testMode)()))
  const apiData = vm.run('Mock.mock(template())')
  console.log('apiData2333' , apiData)
  let result
  switch (method) {
    case 'get':
      result = success({'msg': '你调用了get方法'}, '返回成功')
      break;
    case 'post':
      result = success({'msg': '你调用了post方法'}, '返回成功')
      break;
    case 'put' :
      result = success({'msg': '你调用了put方法'}, '返回成功')
      break;
    case 'patch' :
      result = success({'msg': '你调用了patch方法'}, '返回成功')
      break;
    case 'delete' :
      result = success({'msg': '你调用了delete方法'}, '返回成功')
      break;
    default:
      result = error('返回失败')
  }
  // console.log(result)
  return ctx.body = result
}

const UserDemoProject =
  JSON.stringify({
    'projectName': '示例项目',
    'projectUrl': 'example',
    'projectDesc': '已创建多个示例接口,可直接克隆至个人项目使用~',
    'version': 'v1.0',
    'transferUrl': 'http://localhost:9966/mock/5aa0d3f9041136dbc3e37159',
    'status': 'mock',
    'type': 'demo',
    'masterId': '5a9d2f6c9efdc2347721c4e6',
    'interfaceList': [
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '带参数查询',
        'url': 'query',
        'method': 'get',
        'desc': '根据请求参数返回指定数据',
        'mode': '{\n  success: true,\n  data: {\n    default: \'hello world\',\n    _req: function({\n      _req\n    }) {\n      return _req\n    },\n    name: function({\n      _req\n    }) {\n      return "M" + this.default\n    }\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '上传图片',
        'url': 'upload',
        'method': 'post',
        'desc': '响应POST返回对应图片,在body中加入firleName参数',
        'mode': '{\n  data: {\n    img: function({\n      _req,\n      Mock\n    }) {\n      return _req.body.fileName + "_" + Mock.mock("@image")\n    }\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '项目常用返回数据',
        'url': 'mock',
        'method': 'get',
        'desc': '普通的Mock',
        'mode': '{\n  \'state\': {\n    \'code\': 200,\n    \'msg\': \'获取成功\'\n  },\n  \'data\': {\n    \'username\': \'666\',\n    \'email\': function({\n      Mock\n    }) {\n      return Mock.mock("@email")\n    }\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '随机参数返回',
        'url': 'random',
        'method': 'post',
        'desc': '随机参数返回数据',
        'mode': '{\n  \'success\': true,\n  \'data\': {\n    \'projects|3-10\': [{\n      \'name\': \'演示用\',\n      \'url\': \'@url\',\n      \'email\': \'@email\',\n      \'address\': \'@county(true)\',\n      \'string|1-10\': \'★\',\n      \'number|1-100\': 100,\n      \'boolean|1-2\': true,\n      \'object|2\': {\n        \'310000\': \'上海市\',\n        \'320000\': \'江苏省\',\n        \'330000\': \'浙江省\'\n      }\n    }]\n  }\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': '删除',
        'url': 'delete',
        'method': 'delete',
        'desc': '删除接口模拟',
        'mode': '{\n  \'data\': \'删除成功!\'\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': 'patch',
        'url': 'patch',
        'method': 'patch',
        'desc': '模拟patch提交',
        'mode': '{\n  \'data\': \'patch success\'\n}'
      },
      {
        'projectId': '5aa0d3f9041136dbc3e37159',
        'interfaceName': 'put',
        'url': 'put',
        'method': 'put',
        'desc': 'put success',
        'mode': '{\n  \'data\': \'put success\'\n}'
      }]
  })

module.exports = {
  UserDemoProject
}
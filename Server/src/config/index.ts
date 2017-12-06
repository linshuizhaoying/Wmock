export const config = {
  'app': {
    'root': '/',
    'port': 9966,
    'httpsPort': 9977,
    'env': 'development',
    'keys': 'haoqiaoSecret',
    'baseApi': '/api'
  },
  'mongo': {
      'url': 'mongodb://wmock:wmock233@127.0.0.1:27017/wmock'
  },
  'admin': {  // 后台初始化的用户名密码
      'user': 'linshuizhaoying',
      'password': '123456'
  }
};

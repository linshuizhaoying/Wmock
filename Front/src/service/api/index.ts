// 定义测试接口地址
// const baseUrl = "http://new.haoqiao.me:8866"
// 部署地址
// const baseUrl = "http://wmock.haoqiao.me:9966"
const baseUrl = "http://localhost:9966"
// 未授权用户

export const Login = baseUrl + '/api/login';
export const Reg = baseUrl + '/api/reg';
export const Logout = baseUrl + '/api/logout';

// 消息列表

export const messagesList =  baseUrl + '/api/messagesList';
export const addMessage  =  baseUrl + '/api/addMessage';


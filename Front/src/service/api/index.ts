// 定义测试接口地址
// const baseUrl = "http://new.haoqiao.me:8866"
// 部署地址
// const baseUrl = "http://wmock.haoqiao.me:9966"
const baseUrl = "http://localhost:9966"
// 未授权用户操作
export const Login = baseUrl + '/api/login';
export const Reg = baseUrl + '/api/reg';
export const Logout = baseUrl + '/api/logout';

// 授权用户

export const Token = baseUrl + '/api/token';
// 消息列表

export const messagesList =  baseUrl + '/api/messagesList';
export const addMessage  =  baseUrl + '/api/addMessage';

// 项目列表
// { username:demoId / userId }
export const projectList =  baseUrl + '/api/projectList';

export const addProject =  baseUrl + '/api/addProject';

export const editProject =  baseUrl + '/api/editProject';

export const removeProject =  baseUrl + '/api/removeProject';


// 接口列表

export const interFaceList =  baseUrl + '/api/interFaceList';

export const addInterFace =  baseUrl + '/api/addInterFace';

export const editInterFace =  baseUrl + '/api/editInterFace';

export const removeInterFace =  baseUrl + '/api/removeInterFace';

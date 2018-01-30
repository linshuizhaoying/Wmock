// 定义测试接口地址
// const baseUrl = "http://new.haoqiao.me:8866"
// 部署地址
// const baseUrl = "http://wmock.haoqiao.me:9966"

const baseUrl = "http://localhost:9966"
export const imgBaseUrl = baseUrl + '/images/up/'
// mock数据访问地址
export const MockUrl = baseUrl + "/mock"

// 未授权用户操作
export const Login = baseUrl + '/api/login';
export const Reg = baseUrl + '/api/reg';
export const Logout = baseUrl + '/api/logout';

// 授权用户

export const Token = baseUrl + '/api/token';
export const UserInfo = baseUrl + '/api/userInfo';
// 消息列表

export const messagesList =  baseUrl + '/api/messagesList';
export const addMessage  =  baseUrl + '/api/addMessage';

// 项目列表
// { username:demoId / userId }
export const projectList =  baseUrl + '/api/projectList';

export const addProject =  baseUrl + '/api/addProject';

export const editProject =  baseUrl + '/api/editProject';

export const removeProject =  baseUrl + '/api/removeProject';

export const unJoinProjectList =  baseUrl + '/api/unJoinProjectList';

// 项目示例列表
// { username:demoId / userId }
export const demoList =  baseUrl + '/api/demoList';

export const addDemo =  baseUrl + '/api/addDemo';

export const editDemo =  baseUrl + '/api/editDemo';

export const removeDemo =  baseUrl + '/api/removeDemo';

// 团队列表
export const teamList =  baseUrl + '/api/teamList';

export const addTeamUser =  baseUrl + '/api/addTeamUser';

export const invitedTeamUser =  baseUrl + '/api/invitedTeamUser';

export const removeTeamUser =  baseUrl + '/api/removeTeamUser';

export const sendApply = baseUrl + '/api/sendApply';

export const inviteGroupMember = baseUrl + '/api/inviteGroupMember';

export const removeGroupMember = baseUrl + '/api/removeGroupMember';

export const allowedJoinGroup = baseUrl + '/api/allowedJoinGroup';

export const rejectJoinGroup = baseUrl + '/api/rejectJoinGroup';



// 接口列表

export const interFaceList =  baseUrl + '/api/interFaceList';

export const addInterFace =  baseUrl + '/api/addInterFace';

export const editInterFace =  baseUrl + '/api/editInterFace';

export const removeInterFace =  baseUrl + '/api/removeInterFace';

// 文档列表

export const documentList =  baseUrl + '/api/documentList';

export const addDocument =  baseUrl + '/api/addDocument';

export const editDocument =  baseUrl + '/api/editDocument';

export const removeDocument =  baseUrl + '/api/removeDocument';

// mock模型
export const baseModelList =  baseUrl + '/api/baseModelList';
export const customModelList =  baseUrl + '/api/customModelList';

// 文件上传

export const upload = baseUrl + '/api/upload'
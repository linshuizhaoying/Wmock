// 定义测试接口地址
// const baseUrl = 'http://new.haoqiao.me:8866'cccccccccccccc
// 部署地址
// const baseUrl = 'http://wmock.haoqiao.me:9966'

export const baseUrl = 'http://127.0.0.1:9966'
export const imgBaseUrl = baseUrl + '/images/up/'

// mock数据访问地址
export const MockUrl = baseUrl + '/mock'

// 未授权用户操作
export const Login = baseUrl + '/api/login';
export const Reg = baseUrl + '/api/reg';
export const Logout = baseUrl + '/api/logout';

// 授权用户操作

export const Token = baseUrl + '/api/token';
export const UserInfo = baseUrl + '/api/userInfo';
export const updateUser = baseUrl + '/api/updateUser';
// 消息列表

export const messagesList = baseUrl + '/api/messagesList';
export const addMessage = baseUrl + '/api/addMessage';

// 项目列表
export const allProjectList = baseUrl + '/api/allProjectList';

export const projectList = baseUrl + '/api/projectList';

export const removedInterfaceList = baseUrl + '/api/removedInterfaceList';

export const recoverInterface = baseUrl + '/api/recoverInterface';

export const removedProjectList = baseUrl + '/api/removedProjectList';

export const recoverProject = baseUrl + '/api/recoverProject';

export const addProject = baseUrl + '/api/addProject';

export const updateProject = baseUrl + '/api/updateProject';

export const removeProject = baseUrl + '/api/removeProject';

export const importProject = baseUrl + '/api/importProject';

export const cloneProject = baseUrl + '/api/cloneProject';

export const cloneInterface = baseUrl + '/api/cloneInterface';

export const verifyProject = baseUrl + '/api/verifyProject';

export const unJoinProjectList = baseUrl + '/api/unJoinProjectList';

// 项目示例列表
export const demoList = baseUrl + '/api/demoList';

// 团队列表
export const teamList = baseUrl + '/api/teamList';

export const addTeamUser = baseUrl + '/api/addTeamUser';

export const invitedTeamUser = baseUrl + '/api/invitedTeamUser';

export const removeTeamUser = baseUrl + '/api/removeTeamUser';

export const sendApply = baseUrl + '/api/sendApply';

export const invitedGroupMember = baseUrl + '/api/invitedGroupMember';

export const removeGroupMember = baseUrl + '/api/removeGroupMember';

export const allowedJoinGroup = baseUrl + '/api/allowedJoinGroup';

export const rejectJoinGroup = baseUrl + '/api/rejectJoinGroup';

// 接口列表

export const interFaceList = baseUrl + '/api/interFaceList';
export const addInterFace = baseUrl + '/api/addInterFace';
export const updateInterFace = baseUrl + '/api/updateInterFace';
export const removeInterFace = baseUrl + '/api/removeInterFace';

// 文档列表

export const documentList = baseUrl + '/api/documentList';
export const documentMessages = baseUrl + '/api/documentMessages'
export const updateDocument = baseUrl + '/api/updateDocument';
export const removeDocument = baseUrl + '/api/removeDocument';
export const addDocument = baseUrl + '/api/addDocument';
export const removedDocumentList = baseUrl + '/api/removedDocumentList';
export const recoverDocument = baseUrl + '/api/recoverDocument';
// mock模型
export const baseModelList = baseUrl + '/api/baseModelList';
export const customModelList = baseUrl + '/api/customModelList';
export const updateModel = baseUrl + '/api/updateModel';
export const removeModel = baseUrl + '/api/removeModel';
export const addModel = baseUrl + '/api/addModel';
// 文件上传

export const upload = baseUrl + '/api/upload'
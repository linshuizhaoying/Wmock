import {
  UPDATE_LOCALUSER,
  USER_INFO,
  USER_LOGINERROR,
  USER_LOGINSUCCESS,
  USER_LOGOUT,
  USER_REGERROR,
  USER_REGSUCCESS
} from "../constants/user";
const initialState = {
  userName: "",
  userId: "",
  email: "",
  avatar: "",
  regDate: "",
  role: "",
  isLogin: false
};
const updateUserInfo = (origin: User, userInfo: User) => {
  if (userInfo.oldPass !== undefined) {
    userInfo = {};
  }
  return Object.assign({}, origin, userInfo);
};

const user = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_REGSUCCESS:
      // 本地缓存token
      localStorage.setItem("userId", action.data.userId);
      localStorage.setItem("token", action.data.token);
      return {
        ...state,
        userName: action.data.userName,
        userId: action.data.userId,
        email: action.data.email,
        avatar: action.data.avatar,
        regDate: action.data.regDate,
        role: action.data.role,
        isLogin: true
      };
    case UPDATE_LOCALUSER:
      return {
        ...updateUserInfo(state, action.data)
      };
    case USER_REGERROR:
      localStorage.setItem("token", "");
      return {
        ...state,
        userName: "",
        userId: "",
        email: "",
        avatar: "",
        regDate: "",
        role: "",
        isLogin: false
      };

    case USER_LOGINSUCCESS:
      // 本地缓存token
      localStorage.setItem("userId", action.data.userId);
      localStorage.setItem("token", action.data.token);
      return {
        ...state,
        userName: action.data.userName,
        userId: action.data.userId,
        email: action.data.email,
        avatar: action.data.avatar,
        regDate: action.data.regDate,
        role: action.data.role,
        isLogin: true
      };

    case USER_INFO:
      return {
        ...state,
        userName: action.data.userName,
        userId: action.data.userId,
        email: action.data.email,
        avatar: action.data.avatar,
        regDate: action.data.regDate,
        role: action.data.role
      };
    case USER_LOGINERROR:
      localStorage.setItem("token", "");
      return {
        ...state,
        userName: "",
        userId: "",
        email: "",
        avatar: "",
        regDate: "",
        role: "",
        isLogin: false
      };

    case USER_LOGOUT:
      localStorage.setItem("token", "");
      localStorage.setItem("userId", "");
      return {
        ...state,
        userName: "",
        userId: "",
        email: "",
        avatar: "",
        regDate: "",
        role: "",
        isLogin: false
      };

    default:
      return state;
  }
};

export default user;

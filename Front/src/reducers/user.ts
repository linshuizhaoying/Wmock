import { USER_LOGINSUCCESS, USER_LOGINERROR, USER_LOGOUT, USER_REGSUCCESS, USER_REGERROR, USER_INFO } from '../constants/user';
const initialState = {
   username: '',
   userid:'',
   email:'',
   avatar:'',
   regDate:'',
   role:'',
   isLogin: false,
}

const user = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case USER_REGSUCCESS:
      // 本地缓存token
      localStorage.setItem('token',action.data.token)
      return{
        ...state,
        username: action.data.username,
        userid: action.data.userid,
        email: action.data.email,
        avatar: action.data.avatar,
        regDate: action.data.regDate,
        role: action.data.role,
        isLogin: true
      }
    
    case USER_REGERROR:
      return{
        ...state,
        username: '',
        userid:'',
        email:'',
        avatar:'',
        regDate:'',
        role:'',
        isLogin: false
      }

    case USER_LOGINSUCCESS:
      // 本地缓存token
      localStorage.setItem('token',action.data.token)
      return{
        ...state,
        username: action.data.username,
        userid: action.data.userid,
        email: action.data.email,
        avatar: action.data.avatar,
        regDate: action.data.regDate,
        role: action.data.role,
        isLogin: true
      }
    
    case USER_INFO:
      return{
        ...state,
        username: action.data.username,
        userid: action.data.userid,
        email: action.data.email,
        avatar: action.data.avatar,
        regDate: action.data.regDate,
        role: action.data.role,
      }
    case USER_LOGINERROR:
      return {
        ...state,
        username: '',
        userid:'',
        email:'',
        avatar:'',
        regDate:'',
        role:'',
        isLogin: false,
      }

    case USER_LOGOUT:
      localStorage.setItem('token','');
      return {
        ...state,
        username: '',
        userid:'',
        email:'',
        avatar:'',
        regDate:'',
        role: '',
        isLogin: false,
      }
      
    default:
      return state
  }
}

export default user;
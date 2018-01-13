import { USER_LOGINSUCCESS, USER_LOGINERROR, USER_LOGOUT, USER_REGSUCCESS, USER_REGERROR } from '../constants/user';
const initialState = {
   username: '',
   userid:'',
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
        username: action.data.userName,
        isLogin: true
      }
    
    case USER_REGERROR:
      return{
        ...state,
        username: '',
        isLogin: false
      }

    case USER_LOGINSUCCESS:
      // 本地缓存token
      localStorage.setItem('token',action.data.token)
      return{
        ...state,
        username: action.data.userName,
        userid: action.data.userId,
        isLogin: true
      }

    case USER_LOGINERROR:
      return {
        ...state,
        username: '',
        userid:'',
        isLogin: false,
      }

    case USER_LOGOUT:
      localStorage.setItem('token','');
      return {
        ...state,
        username: '',
        userid:'',
        isLogin: false,
      }
      
    default:
      return state
  }
}

export default user;
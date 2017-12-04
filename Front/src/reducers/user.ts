import { USER_LOGINSUCCESS, USER_LOGINERROR, USER_LOGOUT, USER_REGSUCCESS, USER_REGERROR } from '../constants/user';
const initialState = {
   username: '',
   isLogin: false,
}

const user = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case USER_REGSUCCESS:
      return{
        ...state,
        username: action.data.username,
        isLogin: true
      }
    
    case USER_REGERROR:
      return{
        ...state,
        username: '',
        isLogin: false
      }

    case USER_LOGINSUCCESS:
      return{
        ...state,
        username: action.data.username,
        isLogin: true
      }

    case USER_LOGINERROR:
      return {
        ...state,
        username: '',
        isLogin: false,
      }

    case USER_LOGOUT:
      return {
        ...state,
        username: '',
        isLogin: false,
      }
      
    default:
      return state
  }
}

export default user;
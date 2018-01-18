import { USER_LOGIN, USER_LOGOUT, USER_REG, USER_TOKEN } from '../constants/user'
import  notification  from 'antd/lib/notification';
interface USER {
  username: String,
  password: String
}
interface RegUser  {
  username: string,
  password: string,
  role: string,
  email: string
}
const login = (data: USER) => ({
  type: USER_LOGIN,
  data: data
})

const reg = (data: RegUser) => ({
  type: USER_REG,
  data: data
})

const token = (data: any) => ({
  type: USER_TOKEN,
  data: data
})

const logout = () => ({
  type: USER_LOGOUT
})

export function userLogin (user:USER) {
  return (dispatch: any) => {
    dispatch(login(user))
  }
}


export function userToken (t:any) {
  return (dispatch: any) => {
    dispatch(token(t))
  }
}

export function userReg (user:RegUser) {
  return (dispatch: any) => {
    dispatch(reg(user))
  }
}

export function userLoginSuccess () {
  notification.success({
    message:' 登录成功!',
    description:'登录成功',
    duration: 2
  })
}

export function userLoginError (msg: string) {
  notification.error({
    message:' 登录失败!',
    description: msg,
    duration: 2
  })
}

export function userRegSuccess () {
  notification.success({
    message:' 注册成功!',
    description:'注册成功',
    duration: 2
  })
}

export function userRegError (msg: string) {
  notification.error({
    message:' 注册失败!',
    description: msg,
    duration: 2
  })
}

export function userTokenError (msg: string) {
  notification.error({
    message:' Token无效!',
    description: msg,
    duration: 2
  })
  window.location.reload();
}

export function userLogout () {
  return (dispatch: any) => {
    dispatch(logout())
    notification.success({
      message:' 退出成功!',
      description:'退出成功',
      duration: 2
    })
  }
}
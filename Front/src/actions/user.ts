import { USER_LOGIN, USER_LOGOUT, USER_REG, USER_TOKEN, USER_INFO, UPDATE_USER } from '../constants/user'
import  notification  from 'antd/lib/notification';
interface LoginUser {
  username: string,
  password: string
}
interface User {
  username?: string,
  userid?: string,
  email?: string,
  avatar?: string,
  role?: string,
  oldPass?: string,
  newPass?: string
}
interface RegUser  {
  username: string,
  password: string,
  role: string,
  email: string
}
const login = (data: LoginUser) => ({
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

const info = (data: any) => ({
  type: USER_INFO,
  data: data
})


const update_user = (data: any) => ({
  type: UPDATE_USER,
  data: data
})


const logout = () => ({
  type: USER_LOGOUT
})

export function userLogin (user:LoginUser) {
  return (dispatch: any) => {
    dispatch(login(user))
  }
}


export function userToken (t:any) {
  return (dispatch: any) => {
    dispatch(token(t))
  }
}

export function userInfo (i:any) {
  return (dispatch: any) => {
    dispatch(info(i))
  }
}


export function userReg (user:RegUser) {
  return (dispatch: any) => {
    dispatch(reg(user))
  }
}

export function updateUser (user:User) {
  return (dispatch: any) => {
    dispatch(update_user(user))
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

export function updateUserSuccess (msg: string) {
  notification.success({
    message:' 更新成功!',
    description: msg,
    duration: 2
  })
}

export function updateUserError (msg: string) {
  notification.error({
    message:' 更新失败!',
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
export function tokenOut () {
  return (dispatch: any) => {
    dispatch(logout())
  }
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


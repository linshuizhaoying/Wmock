import { USER_LOGIN, USER_LOGOUT, USER_REG } from '../constants/user'
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


const logout = () => ({
  type: USER_LOGOUT
})



export function userLogin (user:USER) {
  return (dispatch: any) => {
    dispatch(login(user))
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
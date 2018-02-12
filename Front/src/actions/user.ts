import notification from 'antd/lib/notification';
import {
  UPDATE_USER,
  USER_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REG,
  USER_TOKEN
  } from '../constants/user';

const login = (data: LoginUser) => ({
  type: USER_LOGIN,
  data: data
})

const reg = (data: RegUser) => ({
  type: USER_REG,
  data: data
})

const token = (data: object) => ({
  type: USER_TOKEN,
  data: data
})

const info = (userInfoData: object) => ({
  type: USER_INFO,
  data: userInfoData
})

const updateUserData = (user: User) => ({
  type: UPDATE_USER,
  data: user
})

const logout = () => ({
  type: USER_LOGOUT
})

export function userLogin(user: LoginUser) {
  return (dispatch: Function) => {
    dispatch(login(user))
  }
}

export function userToken(data: object) {
  return (dispatch: Function) => {
    dispatch(token(data))
  }
}

export function userInfo(userInfoData: object) {
  return (dispatch: Function) => {
    dispatch(info(userInfoData))
  }
}

export function userReg(user: RegUser) {
  return (dispatch: Function) => {
    dispatch(reg(user))
  }
}

export function updateUser(user: User) {
  return (dispatch: Function) => {
    dispatch(updateUserData(user))
  }
}

export function tokenOut() {
  return (dispatch: Function) => {
    dispatch(logout())
  }
}

export function userLogout() {
  return (dispatch: Function) => {
    dispatch(logout())
    
    notification.success({
      message: ' 退出成功!',
      description: '退出成功',
      duration: 2
    })
  }
}
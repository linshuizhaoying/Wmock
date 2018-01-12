
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import { Login, Reg, Token } from '../service/api'
import * as fetch from '../service/fetch';
import { USER_LOGIN, USER_LOGINSUCCESS, USER_LOGINERROR, USER_REG, USER_REGSUCCESS, USER_REGERROR, USER_TOKEN, USER_LOGOUT } from '../constants/user';
import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { userRegSuccess, userRegError, userLoginSuccess, userLoginError, userTokenError } from '../actions/user'

export const loadingStart = () => ({type: LOADING_START});
export const loadingError = () => ({type: LOADING_ERROR});
export const loadingSuccess = () => ({type: LOADING_SUCCESS});

export const RegSuccess = (data:any) => ({type: USER_REGSUCCESS, data: data});
export const RegError = () => ({type: USER_REGERROR});

export const LoginSuccess = (data:any) => ({type: USER_LOGINSUCCESS, data: data});
export const LoginError = () => ({type: USER_LOGINERROR});
export const TokenOut = () => ({type: USER_LOGOUT});

export const userReg  = (action$:any) =>
  action$.ofType(USER_REG)
  .mergeMap((action:any) =>{
    console.log(fetch.post(Reg, action.data))
    return fetch.post(Reg, action.data)
    // 注册验证情况
    .map((response: any) => {
      if(response.state.code === 1){
        userRegSuccess();
        return RegSuccess(response.data.data);
      }else{
        userRegError(response.state.msg);
        return RegError();
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      // console.log(e)
      return Observable.of(({ type: USER_REGERROR })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(300).startWith(loadingStart())
  });



export const userLogin = (action$:any) =>
  action$.ofType(USER_LOGIN)
    .mergeMap((action: any) => {
      return fetch.post(Login, action.data)
      // 登录验证情况
      .map((response: any) => {
        console.log(response);
        if(response.state.code === 1){
          userLoginSuccess();
          return LoginSuccess(response.data.data);
        }else{
          userLoginError(response.state.msg);
          return LoginError();
        }
      })
      // 只有服务器崩溃才捕捉错误
      .catch((e: any): any => {
        // console.log(e)
        return Observable.of(({ type: USER_LOGINERROR })).startWith(loadingError())
      }).startWith(loadingSuccess()).delay(300).startWith(loadingStart())

    });


export const userToken  = (action$:any) =>
  action$.ofType(USER_TOKEN)
  .mergeMap((action: any) => {
    return fetch.post(Token, action.data)
    // 登录验证情况
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        return LoginSuccess(response.data.data);
      }else{
        console.log('token error')
        userTokenError(response.state.msg);
        return TokenOut();
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      // console.log(e)
      return Observable.of(({ type: USER_LOGINERROR })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(300).startWith(loadingStart())

  });

export default combineEpics(userLogin, userReg, userToken);
    
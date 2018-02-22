import * as fetch from '../service/fetch';
import { combineEpics } from 'redux-observable';
import { LOADING_ERROR, LOADING_START, LOADING_SUCCESS } from '../constants/loading';
import {
  Login,
  Reg,
  Token,
  updateUser,
  UserInfo
} from '../service/api';
import {
  NOTHING,
  UPDATE_LOCALUSER,
  UPDATE_USER,
  USER_INFO,
  USER_LOGIN,
  USER_LOGINERROR,
  USER_LOGINSUCCESS,
  USER_LOGOUT,
  USER_REG,
  USER_REGERROR,
  USER_REGSUCCESS,
  USER_TOKEN
} from '../constants/user';
import { Observable } from 'rxjs/Observable';
import {
  errorMsg,
  successMsg
} from '../actions';
import { Response } from './typing'

export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });

export const RegSuccess = (data: User) => ({ type: USER_REGSUCCESS, data: data });
export const RegError = () => ({ type: USER_REGERROR });

export const LoginSuccess = (data: User) => ({ type: USER_LOGINSUCCESS, data: data });
export const SetUserInfo = (data: User) => ({ type: USER_INFO, data: data });
export const updateLocalUser = (data: User) => ({ type: UPDATE_LOCALUSER, data: data })
export const LoginError = () => ({ type: USER_LOGINERROR });
export const TokenOut = () => ({ type: USER_LOGOUT });
export const nothing = () => ({ type: NOTHING });

export const userReg = (action$: EpicAction) =>
  action$.ofType(USER_REG)
    .mergeMap((action: Action) => {
      return fetch.post(Reg, action.data)
        // 注册验证情况
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return RegSuccess(response.data.data);
          } else {
            errorMsg(response.state.msg);
            return RegError();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: USER_REGERROR })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(300).startWith(loadingStart())
    });

export const userLogin = (action$: EpicAction) =>
  action$.ofType(USER_LOGIN)
    .mergeMap((action: Action) => {
      return fetch.post(Login, action.data)
        // 登录验证情况
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return LoginSuccess(response.data.data);
          } else {
            errorMsg(response.state.msg);
            return LoginError();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: USER_LOGINERROR })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(300).startWith(loadingStart())

    });

export const userToken = (action$: EpicAction) =>
  action$.ofType(USER_TOKEN)
    .mergeMap((action: Action) => {
      return fetch.get(Token)
        // 登录验证情况
        .map((response: Response) => {
          if (response.state.code === 1) {
            return LoginSuccess(response.data.data);
          } else {
            errorMsg(response.state.msg);
            return TokenOut();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: USER_LOGINERROR })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(300).startWith(loadingStart())

    });

export const userInfo = (action$: EpicAction) =>
  action$.ofType(USER_INFO)
    .mergeMap((action: Action) => {
      return fetch.get(UserInfo)
        // 登录验证情况
        .map((response: Response) => {
          if (response.state.code === 1) {
            return SetUserInfo(response.data.data);
          } else {
            errorMsg(response.state.msg);
            return TokenOut();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: USER_LOGINERROR })).startWith(loadingError())
        })

    });

export const userUpdate = (action$: EpicAction) =>
  action$.ofType(UPDATE_USER)
    .mergeMap((action: Action) => {
      return fetch.post(updateUser, action.data)
        // 登录验证情况
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return updateLocalUser(action.data);
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: USER_LOGINERROR })).startWith(loadingError())
        })

    });

export default combineEpics(userLogin, userReg, userToken, userInfo, userUpdate);

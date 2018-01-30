import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { teamList, sendApply } from '../service/api'

import { ERROR_TEAM, FETCH_TEAM, RECEIVE_TEAM, SEND_APPLY, NOTHING } from '../constants/team';

import { errorTeam, sendApplySuccess, sendApplyError } from '../actions/index';
export const loadingStart = () => ({type: LOADING_START});
export const loadingError = () => ({type: LOADING_ERROR});
export const loadingSuccess = () => ({type: LOADING_SUCCESS});

export const teamReceive = (data:any) => ({type: RECEIVE_TEAM, data: data});

export const nothing = () => ({type: NOTHING });

export const fetchTeam = (action$:any) =>
action$.ofType(FETCH_TEAM)
  .mergeMap((action: any) => {
    return fetch.post(teamList,action.data)
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        let temp = response.data;
        return teamReceive(temp);
      }else{
        return errorTeam(response.state.msg);
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      console.log(e)
      return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

  });

export const EsendApply = (action$:any) =>
action$.ofType(SEND_APPLY)
  .mergeMap((action: any) => {
    return fetch.post(sendApply,action.data)
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        sendApplySuccess(response.state.msg)
        return  nothing();
      }else{
        sendApplyError(response.state.msg)
        return  nothing();
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
    })

  });

  export default combineEpics(fetchTeam, EsendApply);
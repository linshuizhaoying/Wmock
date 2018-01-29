import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { baseModelList, customModelList } from '../service/api'

import { ERROR_MODEL, RECEIVEBASE_MODEL, RECEIVECUSTOM_MODEL, FETCHCUSTOM_MODEL, FETCHBASE_MODEL } from '../constants/model';

import { errorModel } from '../actions/index';
export const loadingStart = () => ({type: LOADING_START});
export const loadingError = () => ({type: LOADING_ERROR});
export const loadingSuccess = () => ({type: LOADING_SUCCESS});

export const baseModelReceive = (data:any) => ({type: RECEIVEBASE_MODEL, data: data});
export const customModelReceive = (data:any) => ({type: RECEIVECUSTOM_MODEL, data: data});

export const fetchBaseModel = (action$:any) =>
action$.ofType(FETCHBASE_MODEL)
  .mergeMap((action: any) => {
    return fetch.get(baseModelList)
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        let temp = response.data;
        return baseModelReceive(temp);
      }else{
        return errorModel(response.state.msg);
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      console.log(e)
      return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

  });

export const fetchCustomModel = (action$:any) =>
action$.ofType(FETCHCUSTOM_MODEL)
  .mergeMap((action: any) => {
    return fetch.post(customModelList,action.data)
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        let temp = response.data;
        return customModelReceive(temp);
      }else{
        return errorModel(response.state.msg);
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      console.log(e)
      return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

  });

  export default combineEpics(fetchBaseModel, fetchCustomModel);
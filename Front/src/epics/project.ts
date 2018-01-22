import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { projectList, unJoinProjectList } from '../service/api'

import { ERROR_PROJECT, FETCH_PROJECT, RECEIVE_PROJECT, FETCH_UNJOINPROJECT, RECEIVE_UNJOINPROJECT } from '../constants/project';

import { errorProject } from '../actions/index';
export const loadingStart = () => ({type: LOADING_START});
export const loadingError = () => ({type: LOADING_ERROR});
export const loadingSuccess = () => ({type: LOADING_SUCCESS});

export const projectReceive = (data:any) => ({type: RECEIVE_PROJECT, data: data});
export const unJoinprojectReceive = (data:any) => ({type: RECEIVE_UNJOINPROJECT, data: data});

export const fetchProject = (action$:any) =>
action$.ofType(FETCH_PROJECT)
  .mergeMap((action: any) => {
    return fetch.post(projectList,action.data)
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        let temp = response.data;
        return projectReceive(temp);
      }else{
        return errorProject(response.state.msg);
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      console.log(e)
      return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

  });

export const fetchUnJoinProject = (action$:any) =>
action$.ofType(FETCH_UNJOINPROJECT)
  .mergeMap((action: any) => {
    return fetch.post(unJoinProjectList,action.data)
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        let temp = response.data;
        return unJoinprojectReceive(temp);
      }else{
        return errorProject(response.state.msg);
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      console.log(e)
      return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

  });

  export default combineEpics(fetchProject, fetchUnJoinProject);
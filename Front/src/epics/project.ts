import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { projectList, unJoinProjectList, demoList, addProject, removeProject, updateProject, importProject, cloneProject } from '../service/api'

import {
  ERROR_PROJECT, FETCH_PROJECT,
  RECEIVE_PROJECT, FETCH_UNJOINPROJECT, RECEIVE_UNJOINPROJECT,
  FETCH_DEMO, RECEIVE_DEMO,
  ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT,
  NOTHING,
  UPDATE_LOCALPROJECT,
  REMOVE_LOCALPROJECT,
  IMPORT_PROJECT,
  CLONE_PROJECT
} from '../constants/project';

import {
  errorProject,
  addProjectError, addProjectSuccess,
  removeProjectSuccess, removeProjectError,
  updateProjectSuccess, updateProjectError,
  importProjectSuccess, importProjectError,
  cloneProjectSuccess, cloneProjectError
} from '../actions/index';
export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });

export const projectReceive = (data: any) => ({ type: RECEIVE_PROJECT, data: data });
export const demoReceive = (data: any) => ({ type: RECEIVE_DEMO, data: data });
export const unJoinprojectReceive = (data: any) => ({ type: RECEIVE_UNJOINPROJECT, data: data });
export const updateLocalProject = (data: any) => ({ type: UPDATE_LOCALPROJECT, data: data })
export const removeLocalProject = (data: any) => ({ type: REMOVE_LOCALPROJECT, data: data })
export const nothing = () => ({ type: NOTHING });

export const fetchProject = (action$: any) =>
  action$.ofType(FETCH_PROJECT)
    .mergeMap((action: any) => {
      return fetch.post(projectList, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            let temp = response.data;
            return projectReceive(temp);
          } else {
            return errorProject(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          console.log(e)
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const fetchUnJoinProject = (action$: any) =>
  action$.ofType(FETCH_UNJOINPROJECT)
    .mergeMap((action: any) => {
      return fetch.post(unJoinProjectList, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            let temp = response.data;
            return unJoinprojectReceive(temp);
          } else {
            return errorProject(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          console.log(e)
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const fetchDemo = (action$: any) =>
  action$.ofType(FETCH_DEMO)
    .mergeMap((action: any) => {
      return fetch.post(demoList, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            let temp = response.data;
            return demoReceive(temp);
          } else {
            return errorProject(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          console.log(e)
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const EupdateProject = (action$: any) =>
  action$.ofType(UPDATE_PROJECT)
    .mergeMap((action: any) => {
      return fetch.post(updateProject, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            updateProjectSuccess(response.state.msg)
            return updateLocalProject(action.data);
          } else {
            updateProjectError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        })

    });

export const EremoveProject = (action$: any) =>
  action$.ofType(REMOVE_PROJECT)
    .mergeMap((action: any) => {
      return fetch.post(removeProject, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            removeProjectSuccess(response.state.msg)
            return removeLocalProject(action.data);
          } else {
            removeProjectError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        })

    });

export const EaddProject = (action$: any) =>
  action$.ofType(ADD_PROJECT)
    .mergeMap((action: any) => {
      return fetch.post(addProject, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            addProjectSuccess(response.state.msg)
            return nothing();
          } else {
            addProjectError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        })

    });

export const EimportProject = (action$: any) =>
  action$.ofType(IMPORT_PROJECT)
    .mergeMap((action: any) => {
      return fetch.post(importProject, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            importProjectSuccess(response.state.msg)
            return nothing();
          } else {
            importProjectError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        })

    });

export const EcloneProject = (action$: any) =>
  action$.ofType(CLONE_PROJECT)
    .mergeMap((action: any) => {
      return fetch.post(cloneProject, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            cloneProjectSuccess(response.state.msg)
            return nothing();
          } else {
            cloneProjectError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_PROJECT })).startWith(loadingError())
        })

    });
export default combineEpics(fetchProject, fetchUnJoinProject, fetchDemo, EaddProject, EremoveProject, EupdateProject, EimportProject, EcloneProject);
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { baseModelList, customModelList, updateModel, removeModel, addModel } from '../service/api'

import {
  ERROR_MODEL, RECEIVEBASE_MODEL,
  RECEIVECUSTOM_MODEL, FETCHCUSTOM_MODEL, FETCHBASE_MODEL,
  UPDATE_MODEL, UPDATE_LOCALMODEL, REMOVE_LOCALMODEL, REMOVE_MODEL,
  NOTHING, ADD_MODEL
} from '../constants/model';

import { errorModel, updateModelSuccess, updateModelError, removeModelSuccess, removeModelError, addModelSuccess, addModelError } from '../actions/index';
export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });

export const baseModelReceive = (data: any) => ({ type: RECEIVEBASE_MODEL, data: data });
export const customModelReceive = (data: any) => ({ type: RECEIVECUSTOM_MODEL, data: data });
export const updateLocalModel = (data: any) => ({ type: UPDATE_LOCALMODEL, data: data })
export const removeLocalModel = (data: any) => ({ type: REMOVE_LOCALMODEL, data: data })

export const nothing = () => ({ type: NOTHING });

export const fetchBaseModel = (action$: any) =>
  action$.ofType(FETCHBASE_MODEL)
    .mergeMap((action: any) => {
      return fetch.get(baseModelList)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            let temp = response.data;
            return baseModelReceive(temp);
          } else {
            return errorModel(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          console.log(e)
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const fetchCustomModel = (action$: any) =>
  action$.ofType(FETCHCUSTOM_MODEL)
    .mergeMap((action: any) => {
      return fetch.post(customModelList, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            let temp = response.data;
            return customModelReceive(temp);
          } else {
            return errorModel(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          console.log(e)
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const EupdateModel = (action$: any) =>
  action$.ofType(UPDATE_MODEL)
    .mergeMap((action: any) => {
      return fetch.post(updateModel, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            updateModelSuccess(response.state.msg)
            return updateLocalModel(action.data);
          } else {
            updateModelError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        })

    });

export const EremoveModel = (action$: any) =>
  action$.ofType(REMOVE_MODEL)
    .mergeMap((action: any) => {
      return fetch.post(removeModel, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            removeModelSuccess(response.state.msg)
            return removeLocalModel(action.data);
          } else {
            removeModelError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        })

    });

export const EaddModel = (action$: any) =>
  action$.ofType(ADD_MODEL)
    .mergeMap((action: any) => {
      return fetch.post(addModel, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            addModelSuccess(response.state.msg)
            return nothing();
          } else {
            addModelError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        })

    });
export default combineEpics(fetchBaseModel, fetchCustomModel, EupdateModel, EremoveModel, EaddModel);
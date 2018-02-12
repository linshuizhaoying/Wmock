import * as fetch from '../service/fetch';
import {
  ADD_MODEL,
  ERROR_MODEL,
  FETCHBASE_MODEL,
  FETCHCUSTOM_MODEL,
  NOTHING,
  RECEIVEBASE_MODEL,
  RECEIVECUSTOM_MODEL,
  REMOVE_LOCALMODEL,
  REMOVE_MODEL,
  UPDATE_LOCALMODEL,
  UPDATE_MODEL
} from '../constants/model';
import {
  addModel,
  baseModelList,
  customModelList,
  removeModel,
  updateModel
} from '../service/api';
import {
  errorMsg,
  successMsg
} from '../actions/index';
import { combineEpics } from 'redux-observable';
import { LOADING_ERROR, LOADING_START, LOADING_SUCCESS } from '../constants/loading';
import { Observable } from 'rxjs/Observable';
import { Response } from './typing'

export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });
export const baseModelReceive = (data: Model) => ({ type: RECEIVEBASE_MODEL, data: data });
export const customModelReceive = (data: Model) => ({ type: RECEIVECUSTOM_MODEL, data: data });
export const updateLocalModel = (data: Model) => ({ type: UPDATE_LOCALMODEL, data: data })
export const removeLocalModel = (data: Model) => ({ type: REMOVE_LOCALMODEL, data: data })
export const nothing = () => ({ type: NOTHING });

export const fetchBaseModel = (action$: EpicAction) =>
  action$.ofType(FETCHBASE_MODEL)
    .mergeMap((action: Action) => {
      return fetch.get(baseModelList)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data;
            return baseModelReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const fetchCustomModel = (action$: EpicAction) =>
  action$.ofType(FETCHCUSTOM_MODEL)
    .mergeMap((action: Action) => {
      return fetch.post(customModelList, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data;
            return customModelReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const EupdateModel = (action$: EpicAction) =>
  action$.ofType(UPDATE_MODEL)
    .mergeMap((action: Action) => {
      return fetch.post(updateModel, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return updateLocalModel(action.data);
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        })

    });

export const EremoveModel = (action$: EpicAction) =>
  action$.ofType(REMOVE_MODEL)
    .mergeMap((action: Action) => {
      return fetch.post(removeModel, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return removeLocalModel(action.data);
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        })

    });

export const EaddModel = (action$: EpicAction) =>
  action$.ofType(ADD_MODEL)
    .mergeMap((action: Action) => {
      return fetch.post(addModel, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return nothing();
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_MODEL })).startWith(loadingError())
        })

    });
export default combineEpics(fetchBaseModel, fetchCustomModel, EupdateModel, EremoveModel, EaddModel);
import * as fetch from '../service/fetch';
import {
  ADD_DOCUMENT,
  ERROR_DOCUMENT,
  FETCH_DOCUMENT,
  NOTHING,
  RECEIVE_DOCUMENT,
  REMOVE_DOCUMENT,
  REMOVE_LOCALDOCUMENT,
  UPDATE_DOCUMENT,
  UPDATE_LOCALDOCUMENT
} from '../constants/document';
import {
  addDocument,
  documentList,
  removeDocument,
  updateDocument
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
export const documentReceive = (data: Document) => ({ type: RECEIVE_DOCUMENT, data: data });
export const updateLocalDocument = (data: Document) => ({ type: UPDATE_LOCALDOCUMENT, data: data })
export const removeLocalDocument = (data: Document) => ({ type: REMOVE_LOCALDOCUMENT, data: data })
export const nothing = () => ({ type: NOTHING });

export const fetchAllDocument = (action$: EpicAction) =>
  action$.ofType(FETCH_DOCUMENT)
    .mergeMap((action: Action) => {
      return fetch.get(documentList, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data;
            return documentReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const EupdateDocument = (action$: EpicAction) =>
  action$.ofType(UPDATE_DOCUMENT)
    .mergeMap((action: Action) => {
      return fetch.post(updateDocument, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return updateLocalDocument(action.data);
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        })

    });

export const EremoveDocument = (action$: EpicAction) =>
  action$.ofType(REMOVE_DOCUMENT)
    .mergeMap((action: Action) => {
      return fetch.post(removeDocument, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return removeLocalDocument(action.data);
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        })

    });

export const EaddDocument = (action$: EpicAction) =>
  action$.ofType(ADD_DOCUMENT)
    .mergeMap((action: Action) => {
      return fetch.post(addDocument, action.data)
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
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        })

    });

export default combineEpics(fetchAllDocument, EupdateDocument, EaddDocument, EremoveDocument);
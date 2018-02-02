import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { documentList, updateDocument, addDocument, removeDocument } from '../service/api'

import {
  ERROR_DOCUMENT, FETCH_DOCUMENT, RECEIVE_DOCUMENT,
  ADD_DOCUMENT, REMOVE_DOCUMENT,
  REMOVE_LOCALDOCUMENT, UPDATE_DOCUMENT, UPDATE_LOCALDOCUMENT,
  NOTHING
} from '../constants/document';

import {
  errorDocument,
  removeDocumentError, removeDocumentSuccess,
  updateDocumentError, updateDocumentSuccess,
  addDocumentError, addDocumentSuccess
} from '../actions/index';
export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });

export const documentReceive = (data: any) => ({ type: RECEIVE_DOCUMENT, data: data });
export const updateLocalDocument = (data: any) => ({ type: UPDATE_LOCALDOCUMENT, data: data })
export const removeLocalDocument = (data: any) => ({ type: REMOVE_LOCALDOCUMENT, data: data })

export const nothing = () => ({ type: NOTHING });

export const fetchAllDocument = (action$: any) =>
  action$.ofType(FETCH_DOCUMENT)
    .mergeMap((action: any) => {
      return fetch.post(documentList, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            let temp = response.data;
            return documentReceive(temp);
          } else {
            return errorDocument(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          console.log(e)
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });


export const EupdateDocument = (action$: any) =>
  action$.ofType(UPDATE_DOCUMENT)
    .mergeMap((action: any) => {
      return fetch.post(updateDocument, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            updateDocumentSuccess(response.state.msg)
            return updateLocalDocument(action.data);
          } else {
            updateDocumentError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        })

    });

export const EremoveDocument = (action$: any) =>
  action$.ofType(REMOVE_DOCUMENT)
    .mergeMap((action: any) => {
      return fetch.post(removeDocument, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            removeDocumentSuccess(response.state.msg)
            return removeLocalDocument(action.data);
          } else {
            removeDocumentError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        })

    });

export const EaddDocument = (action$: any) =>
  action$.ofType(ADD_DOCUMENT)
    .mergeMap((action: any) => {
      return fetch.post(addDocument, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            addDocumentSuccess(response.state.msg)
            return nothing();
          } else {
            addDocumentError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_DOCUMENT })).startWith(loadingError())
        })

    });

export default combineEpics(fetchAllDocument, EupdateDocument, EaddDocument, EremoveDocument);
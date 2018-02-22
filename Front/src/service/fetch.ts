/*
  基于RxJs封装Ajax请求,简化调用方式,内部处理错误信息.

  作者: linshuizhaoying
  时间: 2017-11-30  19:44:35  
*/

import { Observable } from 'rxjs/Rx'
import { AjaxResponse } from 'rxjs/Rx'
import { AjaxError } from 'rxjs/Rx'
import { replace } from 'react-router-redux'
import { USER_LOGOUT } from '../constants/user'
import notification from 'antd/lib/notification';

const defaultHeaders = {
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
};
export const handleAjaxError = (ajaxError: AjaxError) => {
  if (ajaxError.status === 0) {
    notification.error({
      message: '服务器访问错误!',
      description: '服务器可能崩溃了~',
      duration: 2
    })
    return Observable.of(USER_LOGOUT);
  }
  if (ajaxError.status !== 200) {
    localStorage.setItem('token', '')
    return Observable.of(replace('/login'))
  }
  return

}

export const get = (url: string, headers: {} = {
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
}) => {
  return Observable.ajax.get(url, Object.assign({}, defaultHeaders, headers))
    .map((ajaxResponse: AjaxResponse) => {
      return ajaxResponse.response
    })
    .catch((ajaxErrorData: AjaxError) => {
      handleAjaxError(ajaxErrorData);
      return Observable.throw(ajaxErrorData);
    })
}

export const post = (url: string, body: {}, headers: {} = {
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
}): Observable<AjaxResponse> => {
  return Observable.ajax.post(url, body, Object.assign({}, defaultHeaders, headers))
    .map((ajaxResponse: AjaxResponse) => {
      return ajaxResponse.response
    })
    .catch((ajaxErrorData: AjaxError) => {
      handleAjaxError(ajaxErrorData);
      return Observable.throw(ajaxErrorData);
    })
}

export const put = (url: string, body: {}, headers: {} = {
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
}): Observable<AjaxResponse> => {
  return Observable.ajax.put(url, body, Object.assign({}, defaultHeaders, headers))
    .map((ajaxResponse: AjaxResponse) => {
      return ajaxResponse.response.state
    })
    .catch((ajaxErrorData: AjaxError) => {
      handleAjaxError(ajaxErrorData);
      return Observable.throw(ajaxErrorData);
    })
}

export const del = (url: string, headers: {} = {
  'Authorization': localStorage.getItem('token'),
  'Content-Type': 'application/json'
}): Observable<AjaxResponse> => {
  return Observable.ajax.delete(url, Object.assign({}, defaultHeaders, headers))
    .map((ajaxResponse: AjaxResponse) => {
      return ajaxResponse.response.state
    })
    .catch((ajaxErrorData: AjaxError) => {
      handleAjaxError(ajaxErrorData);
      return Observable.throw(ajaxErrorData);
    })
}
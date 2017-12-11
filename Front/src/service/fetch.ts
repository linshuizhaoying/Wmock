/*
  基于RxJs封装Ajax请求,简化调用方式,内部处理错误信息.

  作者: linshuizhaoying
  时间: 2017-11-30  19:44:35  
*/

import { Observable } from 'rxjs/Rx'
import { AjaxResponse } from 'rxjs/Rx'
import { AjaxError } from 'rxjs/Rx'
import  notification  from 'antd/lib/notification';
// import { replace } from 'react-router-redux'



const defaultHeaders = {
  //Authorization: "<put here in future>",
  'Content-Type': 'application/json'
};
export const handleAjaxError = (ajaxError: any) => {
  if(ajaxError.status === 0){
    notification.error({
      message:'服务器访问错误!',
      description:'服务器可能崩溃了~',
      duration: 2
    })
  }
  
	// if (ajaxError.status === 403)
	// 	return Observable.of(replace('/'))
	// else if (ajaxError.status === 401)
  //   return Observable.of(replace('/login'))
  // if ( ajaxError.status === 401 ) {
  //   return Observable.of( TokenActions.tokenRemove() );
  // }
  // return Observable.of( {
  //   type: 'TOKEN_ERROR',
  //   error: ajaxError.status
  // } );
  return Observable.empty();
    
}

export const get = (url: string, headers: any = {}) =>{
  console.log(url)
  return Observable.ajax.get(url, Object.assign({}, defaultHeaders, headers))
    .map((ajaxResponse: AjaxResponse) => {
      console.log(ajaxResponse);
      return ajaxResponse.response
    })
    .catch((ajaxErrorData: AjaxError) => {
      console.log('error')
      handleAjaxError(ajaxErrorData);
      return Observable.throw(ajaxErrorData);
    })
}

export const post = (url: string, body: any, headers: any = {} ): Observable<AjaxResponse> => { 
  return Observable.ajax.post(url, body, Object.assign({}, defaultHeaders, headers)).map((ajaxResponse: AjaxResponse) => {
      console.log(ajaxResponse);
      return ajaxResponse.response.state
    })
    .catch((ajaxErrorData: AjaxError) => {
      console.log('error')
      handleAjaxError(ajaxErrorData);
      return Observable.throw(ajaxErrorData);
    })
}

export const put = (url: string, body: any, headers: any = {} ): Observable<AjaxResponse> => {
  return Observable.ajax.put(url, body, Object.assign({}, defaultHeaders, headers)).map((ajaxResponse: AjaxResponse) => {
    console.log(ajaxResponse);
      return ajaxResponse.response.state
  })
  .catch((ajaxErrorData: AjaxError) => {
    console.log('error')
    handleAjaxError(ajaxErrorData);
    return Observable.throw(ajaxErrorData);
  })
}

export const del = (url: string, headers: any = {}): Observable<AjaxResponse> => {
  return Observable.ajax.delete(url, Object.assign({}, defaultHeaders, headers)).map((ajaxResponse: AjaxResponse) => {
    console.log(ajaxResponse);
      return ajaxResponse.response.state
  })
  .catch((ajaxErrorData: AjaxError) => {
    console.log('error')
    handleAjaxError(ajaxErrorData);
    return Observable.throw(ajaxErrorData);
  })
}


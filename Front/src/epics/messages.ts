import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { messagesList } from '../service/api'
import { ERROR_MESSAGES, FETCH_MESSAGES, RECEIVE_MESSAGES } from '../constants/messages';
import { errorMessages } from '../actions/index';
export const loadingStart = () => ({type: LOADING_START});
export const loadingError = () => ({type: LOADING_ERROR});
export const loadingSuccess = () => ({type: LOADING_SUCCESS});

export const messagesReceive = (data:any) => ({type: RECEIVE_MESSAGES, data: data});

export const fetchMessages = (action$:any) =>
action$.ofType(FETCH_MESSAGES)
  .mergeMap((action: any) => {
    return fetch.get(messagesList)
    .map((response: any) => {
      console.log(response);
      if(response.state.code === 1){
        let temp = response.data;
        // 数据按照最新时间进行排序
        temp.data.sort((a:any, b:any)=>{
          return +new Date(b.time) - +new Date(a.time);
        })
        return messagesReceive(temp);
      }else{
        return errorMessages(response.state.msg);
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      // console.log(e)
      return Observable.of(({ type: ERROR_MESSAGES })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(300).startWith(loadingStart())

  });

  export default combineEpics(fetchMessages);
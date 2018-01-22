import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import { messagesList } from '../service/api'
import { ERROR_MESSAGES, FETCH_MESSAGES, RECEIVE_MESSAGES } from '../constants/messages';
import { RECEIVEMESSAGES_TEAM } from '../constants/team';
import { errorMessages } from '../actions/index';
export const loadingStart = () => ({type: LOADING_START});
export const loadingError = () => ({type: LOADING_ERROR});
export const loadingSuccess = () => ({type: LOADING_SUCCESS});

export const messagesReceive = (data:any) => ({type: RECEIVE_MESSAGES, data: data});
export const teamMessagesReceive = (data:any) => ({type: RECEIVEMESSAGES_TEAM, data: data});
// 获取用户所有相关的消息
let messages:any[] = [];
let teamMessages:any[] = [];

export const fetchMessages = (action$:any) =>
action$.ofType(FETCH_MESSAGES)
  .mergeMap((action: any) => {
    return fetch.get(messagesList)
    .map((response: any) => {
      messages = []
      teamMessages = []
      console.log(response);
      if(response.state.code === 1){
        let temp = response.data;
        console.log(temp)
        // 数据按照最新时间进行排序
        temp.data.sort((a:any, b:any)=>{
          return +new Date(b.time) - +new Date(a.time);
        })
        // 对不同类型消息进行拆分
        temp.data.map((item:any) =>{
          if(item.type === 'normal'){
            messages.push(item)
          }
          // 只有未读的团队消息才载入
          if(item.type === 'team' && item.readed === false){
            teamMessages.push(item)
          }
          return item
        })
        // console.log(messages)
        // teamMessagesReceive(teamMessages)
        // console.log(teamMessages)
        // messagesReceive(messages)
       // Observable.of(([{type: RECEIVEMESSAGES_TEAM, data: teamMessages},{type: RECEIVE_MESSAGES, data: messages}]))
        return  messagesReceive([messages,teamMessages])
      }else{
        return errorMessages(response.state.msg)
      }
    })
    // 只有服务器崩溃才捕捉错误
    .catch((e: any): any => {
      // console.log(e)
      return Observable.of(({ type: ERROR_MESSAGES })).startWith(loadingError())
    }).startWith(loadingSuccess()).delay(200).startWith(loadingStart());

  })

  // 获取指定项目动态

  
  export default combineEpics(fetchMessages);
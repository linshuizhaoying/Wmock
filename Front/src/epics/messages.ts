import * as fetch from '../service/fetch';
import { combineEpics } from 'redux-observable';
import { ERROR_MESSAGES, FETCH_MESSAGES, RECEIVE_MESSAGES } from '../constants/messages';
import { errorMsg } from '../actions/index';
import { LOADING_ERROR, LOADING_START, LOADING_SUCCESS } from '../constants/loading';
import { messagesList } from '../service/api';
import { Observable } from 'rxjs/Observable';
import { Response } from './typing';

export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });
export const messagesReceive = (data: Array<Array<Message>>) => ({ type: RECEIVE_MESSAGES, data: data });
// 获取用户所有相关的消息
let messages: Array<Message> = [];
let teamMessages: Array<Message> = [];

export const fetchMessages = (action$: EpicAction) =>
  action$.ofType(FETCH_MESSAGES)
    .mergeMap((action: Action) => {
      return fetch.get(messagesList)
        .map((response: Response) => {
          messages = []
          teamMessages = []
          if (response.state.code === 1) {
            let temp = response.data;
            // 如果返回有数据就去处理
            if (temp.data) {
              // 数据按照最新时间进行排序
              temp.data.sort((a: Message, b: Message) => {
                return +new Date(b.time) - +new Date(a.time);
              })
              // 对不同类型消息进行拆分
              temp.data.map((item: Message) => {
                if (item.type === 'normal') {
                  messages.push(item)
                }
                // 只有未读的团队消息才载入
                if (item.type === 'team' && item.readed === false) {
                  teamMessages.push(item)
                }
                return item
              })
            }
            return messagesReceive([messages, teamMessages])
          } else {
            return errorMsg(response.state.msg)
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_MESSAGES })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart());

    })

// 获取指定项目动态
export default combineEpics(fetchMessages);
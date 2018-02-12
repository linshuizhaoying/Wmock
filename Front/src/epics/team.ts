import * as fetch from '../service/fetch';
import './typing'
import {
  ALLOWED_JOINGROUP,
  ERROR_TEAM,
  FETCH_TEAM,
  INVITED_GROUPMEMBER,
  NOTHING,
  RECEIVE_TEAM,
  REJECT_JOINGROUP,
  REMOVE_GROUPMEMBER,
  REMOVE_USER,
  SEND_APPLY
} from '../constants/team';
import {
  allowedJoinGroup,
  invitedGroupMember,
  rejectJoinGroup,
  removeGroupMember,
  sendApply,
  teamList
} from '../service/api';
import { combineEpics } from 'redux-observable';
import { DEAL_JOINGROUP } from '../constants/messages';
import { LOADING_ERROR, LOADING_START, LOADING_SUCCESS } from '../constants/loading';
import { Observable } from 'rxjs/Observable';

import {
  errorMsg,
  successMsg
} from '../actions/index';
import { Response } from './typing'

export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });
export const teamReceive = (data: Team) => ({ type: RECEIVE_TEAM, data: data });
export const dealJoinGroup = (id: string) => ({ type: DEAL_JOINGROUP, data: id })
export const removeUser = (data: User) => ({ type: REMOVE_USER, data: data })
export const nothing = () => ({ type: NOTHING });

export const fetchTeam = (action$: EpicAction) =>
  action$.ofType(FETCH_TEAM)
    .mergeMap((action: Action) => {
      return fetch.post(teamList, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data;
            return teamReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const EsendApply = (action$: EpicAction) =>
  action$.ofType(SEND_APPLY)
    .mergeMap((action: Action) => {
      return fetch.post(sendApply, action.data)
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
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const ErejectJoinGroup = (action$: EpicAction) =>
  action$.ofType(REJECT_JOINGROUP)
    .mergeMap((action: Action) => {
      return fetch.post(rejectJoinGroup, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return dealJoinGroup(action.data.messageId);
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const EallowedJoinGroup = (action$: EpicAction) =>
  action$.ofType(ALLOWED_JOINGROUP)
    .mergeMap((action: Action) => {
      return fetch.post(allowedJoinGroup, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return dealJoinGroup(action.data.messageId);
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const EremoveGroupMember = (action$: EpicAction) =>
  action$.ofType(REMOVE_GROUPMEMBER)
    .mergeMap((action: Action) => {
      return fetch.post(removeGroupMember, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg)
            return removeUser(action.data);
          } else {
            errorMsg(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const EinvitedGroupMember = (action$: EpicAction) =>
  action$.ofType(INVITED_GROUPMEMBER)
    .mergeMap((action: Action) => {
      return fetch.post(invitedGroupMember, action.data)
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
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export default combineEpics(
  fetchTeam,
  EsendApply,
  EallowedJoinGroup,
  ErejectJoinGroup,
  EremoveGroupMember,
  EinvitedGroupMember);
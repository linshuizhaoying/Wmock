import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable';
import * as fetch from '../service/fetch';

import { LOADING_START, LOADING_ERROR, LOADING_SUCCESS } from '../constants/loading';
import {
  teamList, sendApply,
  allowedJoinGroup, rejectJoinGroup,
  removeGroupMember, invitedGroupMember
} from '../service/api'

import {
  ERROR_TEAM, FETCH_TEAM, RECEIVE_TEAM, SEND_APPLY, NOTHING,
  ALLOWED_JOINGROUP, REJECT_JOINGROUP,
  REMOVE_GROUPMEMBER, INVITED_GROUPMEMBER,
  REMOVE_USER
} from '../constants/team';
import { DEAL_JOINGROUP } from '../constants/messages'
import {
  errorTeam,
  sendApplySuccess, sendApplyError,
  allowedJoinSuccess, allowedJoinError,
  rejectJoinError, rejectJoinSuccess,
  removeGroupMemberError, removeGroupMemberSuccess,
  invitedGroupMemberSuccess, invitedGroupMemberError,
} from '../actions/index';
export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });

export const teamReceive = (data: any) => ({ type: RECEIVE_TEAM, data: data });

export const dealJoinGroup = (id: string) => ({ type: DEAL_JOINGROUP, data: id })
export const removeUser = (data: any) => ({ type: REMOVE_USER, data: data })

export const nothing = () => ({ type: NOTHING });

export const fetchTeam = (action$: any) =>
  action$.ofType(FETCH_TEAM)
    .mergeMap((action: any) => {
      return fetch.post(teamList, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            let temp = response.data;
            return teamReceive(temp);
          } else {
            return errorTeam(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          console.log(e)
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        }).startWith(loadingSuccess()).delay(200).startWith(loadingStart())

    });

export const EsendApply = (action$: any) =>
  action$.ofType(SEND_APPLY)
    .mergeMap((action: any) => {
      return fetch.post(sendApply, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            sendApplySuccess(response.state.msg)
            return nothing();
          } else {
            sendApplyError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const ErejectJoinGroup = (action$: any) =>
  action$.ofType(REJECT_JOINGROUP)
    .mergeMap((action: any) => {
      return fetch.post(rejectJoinGroup, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            rejectJoinSuccess(response.state.msg)
            return dealJoinGroup(action.data.messageId);
          } else {
            rejectJoinError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const EallowedJoinGroup = (action$: any) =>
  action$.ofType(ALLOWED_JOINGROUP)
    .mergeMap((action: any) => {
      return fetch.post(allowedJoinGroup, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            allowedJoinSuccess(response.state.msg)
            return dealJoinGroup(action.data.messageId);
          } else {
            allowedJoinError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const EremoveGroupMember = (action$: any) =>
  action$.ofType(REMOVE_GROUPMEMBER)
    .mergeMap((action: any) => {
      return fetch.post(removeGroupMember, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            removeGroupMemberSuccess(response.state.msg)
            return removeUser(action.data);
          } else {
            removeGroupMemberError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export const EinvitedGroupMember = (action$: any) =>
  action$.ofType(INVITED_GROUPMEMBER)
    .mergeMap((action: any) => {
      return fetch.post(invitedGroupMember, action.data)
        .map((response: any) => {
          console.log(response);
          if (response.state.code === 1) {
            invitedGroupMemberSuccess(response.state.msg)
            return nothing();
          } else {
            invitedGroupMemberError(response.state.msg)
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: any): any => {
          return Observable.of(({ type: ERROR_TEAM })).startWith(loadingError())
        })

    });

export default combineEpics(fetchTeam, EsendApply, EallowedJoinGroup, ErejectJoinGroup, EremoveGroupMember, EinvitedGroupMember);
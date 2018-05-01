import * as fetch from "../service/fetch";
import * as io from "socket.io-client";

import {
  ADD_INTERFACE,
  ADD_PROJECT,
  ALL_PROJECT,
  CLONE_INTERFACE,
  CLONE_PROJECT,
  ERROR_PROJECT,
  FETCH_DEMO,
  FETCH_PROJECT,
  FETCH_UNJOINPROJECT,
  IMPORT_PROJECT,
  NOTHING,
  RECEIVE_ALLPROJECT,
  RECEIVE_DEMO,
  RECEIVE_PROJECT,
  RECEIVE_REMOVEDINTERFACE,
  RECEIVE_REMOVEDPROJECT,
  RECEIVE_UNJOINPROJECT,
  RECEIVE_VERIFYPROJECT,
  RECOVER_INTERFACE,
  RECOVER_PROJECT,
  REMOVED_INTERFACE,
  REMOVED_PROJECT,
  REMOVE_INTERFACE,
  REMOVE_LOCALINTERFACE,
  REMOVE_LOCALPROJECT,
  REMOVE_PROJECT,
  UPDATE_INTERFACE,
  UPDATE_LOCALINTERFACE,
  UPDATE_LOCALPROJECT,
  UPDATE_PROJECT,
  VERIFY_PROJECT
} from "../constants/project";
import {
  LOADING_ERROR,
  LOADING_START,
  LOADING_SUCCESS
} from "../constants/loading";
import {
  addInterFace,
  addProject,
  allProjectList,
  cloneInterface,
  cloneProject,
  demoList,
  importProject,
  projectList,
  recoverInterface,
  recoverProject,
  removeInterFace,
  removeProject,
  removedInterfaceList,
  removedProjectList,
  unJoinProjectList,
  updateInterFace,
  updateProject,
  verifyProject
} from "../service/api";
import { errorMsg, successMsg } from "../actions/index";

import { Observable } from "rxjs/Observable";
import { Response } from "./typing";
import { baseUrl } from "../service/api";
import { combineEpics } from "redux-observable";

const socket = io(baseUrl);

export const loadingStart = () => ({ type: LOADING_START });
export const loadingError = () => ({ type: LOADING_ERROR });
export const loadingSuccess = () => ({ type: LOADING_SUCCESS });
export const projectReceive = (data: Project) => ({
  type: RECEIVE_PROJECT,
  data: data
});
export const allProjectListReceive = (data: Project) => ({
  type: RECEIVE_ALLPROJECT,
  data: data
});
export const removedInterfaceListReceive = (data: Project) => ({
  type: RECEIVE_REMOVEDINTERFACE,
  data: data
});
export const removedProjectListReceive = (data: Project) => ({
  type: RECEIVE_REMOVEDPROJECT,
  data: data
});
export const demoReceive = (data: Project) => ({
  type: RECEIVE_DEMO,
  data: data
});
export const unJoinprojectReceive = (data: Project) => ({
  type: RECEIVE_UNJOINPROJECT,
  data: data
});
export const updateLocalProject = (data: Project) => ({
  type: UPDATE_LOCALPROJECT,
  data: data
});
export const removeLocalProject = (data: Project) => ({
  type: REMOVE_LOCALPROJECT,
  data: data
});
export const verifyLocalProject = (data: Project) => ({
  type: RECEIVE_VERIFYPROJECT,
  data: data
});
export const updateLocalInterface = (data: Interface) => ({
  type: UPDATE_LOCALINTERFACE,
  data: data
});
export const removeLocalInterface = (data: Interface) => ({
  type: REMOVE_LOCALINTERFACE,
  data: data
});

export const nothing = () => ({ type: NOTHING });

export const fetchProject = (action$: EpicAction) =>
  action$.ofType(FETCH_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .get(projectList)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data;
            return projectReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
        .startWith(loadingSuccess())
        .delay(200)
        .startWith(loadingStart())
    );
  });

export const fetchRemovedInterfaceList = (action$: EpicAction) =>
  action$.ofType(REMOVED_INTERFACE).mergeMap((action: Action) => {
    return (
      fetch
        .get(removedInterfaceList)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data.data;
            return removedInterfaceListReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
        .startWith(loadingSuccess())
        .delay(200)
        .startWith(loadingStart())
    );
  });
export const fetchRemovedProjectList = (action$: EpicAction) =>
  action$.ofType(REMOVED_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .get(removedProjectList)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data.data;
            return removedProjectListReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
        .startWith(loadingSuccess())
        .delay(200)
        .startWith(loadingStart())
    );
  });
export const fetchAllProjectList = (action$: EpicAction) =>
  action$.ofType(ALL_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .get(allProjectList)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data.data;
            return allProjectListReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
        .startWith(loadingSuccess())
        .delay(200)
        .startWith(loadingStart())
    );
  });
export const fetchUnJoinProject = (action$: EpicAction) =>
  action$.ofType(FETCH_UNJOINPROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .get(unJoinProjectList)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data;
            return unJoinprojectReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
        .startWith(loadingSuccess())
        .delay(200)
        .startWith(loadingStart())
    );
  });

export const fetchDemo = (action$: EpicAction) =>
  action$.ofType(FETCH_DEMO).mergeMap((action: Action) => {
    return (
      fetch
        .get(demoList)
        .map((response: Response) => {
          if (response.state.code === 1) {
            let temp = response.data;
            return demoReceive(temp);
          } else {
            return errorMsg(response.state.msg);
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
        .startWith(loadingSuccess())
        .delay(200)
        .startWith(loadingStart())
    );
  });

export const ErecoverInterface = (action$: EpicAction) =>
  action$.ofType(RECOVER_INTERFACE).mergeMap((action: Action) => {
    return (
      fetch
        .post(recoverInterface, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return nothing();
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });
export const ErecoverProject = (action$: EpicAction) =>
  action$.ofType(RECOVER_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .post(recoverProject, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return nothing();
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });
export const EupdateProject = (action$: EpicAction) =>
  action$.ofType(UPDATE_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .post(updateProject, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            socket.emit("updateProject", {
              projectId: action.data._id,
              userId: localStorage.getItem("userId")
            });

            return updateLocalProject(action.data);
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EremoveProject = (action$: EpicAction) =>
  action$.ofType(REMOVE_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .post(removeProject, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return removeLocalProject(action.data);
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EaddProject = (action$: EpicAction) =>
  action$.ofType(ADD_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .post(addProject, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return nothing();
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EimportProject = (action$: EpicAction) =>
  action$.ofType(IMPORT_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .post(importProject, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return nothing();
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EcloneProject = (action$: EpicAction) =>
  action$.ofType(CLONE_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .post(cloneProject, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return nothing();
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EcloneInterface = (action$: EpicAction) =>
  action$.ofType(CLONE_INTERFACE).mergeMap((action: Action) => {
    return (
      fetch
        .post(cloneInterface, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return nothing();
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EverifyProject = (action$: EpicAction) =>
  action$.ofType(VERIFY_PROJECT).mergeMap((action: Action) => {
    return (
      fetch
        .post(verifyProject, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return verifyLocalProject(response.data);
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EupdateInterface = (action$: EpicAction) =>
  action$.ofType(UPDATE_INTERFACE).mergeMap((action: Action) => {
    return (
      fetch
        .post(updateInterFace, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return updateLocalInterface(action.data);
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EremoveInterface = (action$: EpicAction) =>
  action$.ofType(REMOVE_INTERFACE).mergeMap((action: Action) => {
    return (
      fetch
        .post(removeInterFace, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return removeLocalInterface(action.data);
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export const EaddInterface = (action$: EpicAction) =>
  action$.ofType(ADD_INTERFACE).mergeMap((action: Action) => {
    return (
      fetch
        .post(addInterFace, action.data)
        .map((response: Response) => {
          if (response.state.code === 1) {
            successMsg(response.state.msg);
            return nothing();
          } else {
            errorMsg(response.state.msg);
            return nothing();
          }
        })
        // 只有服务器崩溃才捕捉错误
        .catch((e: Error): Observable<Action> => {
          return Observable.of({ type: ERROR_PROJECT }).startWith(
            loadingError()
          );
        })
    );
  });

export default combineEpics(
  fetchAllProjectList,
  fetchProject,
  fetchUnJoinProject,
  fetchDemo,
  fetchRemovedInterfaceList,
  fetchRemovedProjectList,
  ErecoverInterface,
  ErecoverProject,
  EaddProject,
  EremoveProject,
  EupdateProject,
  EimportProject,
  EcloneProject,
  EcloneInterface,
  EverifyProject,
  EaddInterface,
  EremoveInterface,
  EupdateInterface
);

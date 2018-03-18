import * as io from "socket.io-client";
import epics from "../epics";
import logger from "redux-logger";
import notification from "antd/lib/notification";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { baseUrl } from "../service/api";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import {
  fetchTeam,
  fetchDocument,
  fetchProject,
  fetchUnJoinProject,
  fetchMessages
} from "../actions/index";

// import createSocketMiddleware from '../socket'
// const socketMiddleware = createSocketMiddleware();
const epicMiddleware = createEpicMiddleware(epics);
const socket = io(baseUrl);

export function configureStore(preloadState: {} = {}) {
  const store = createStore(
    reducers,
    preloadState,
    composeWithDevTools(
      applyMiddleware(thunk, logger, epicMiddleware)
      // (window as any).devToolsExtension && (window as any).devToolsExtension()
    )
  );
  socket.on("newMessage", (data: InstantMessage) => {
    // console.log("服务器发信息啦", data);
    let type: string = "";
    switch (data.type) {
      case "team":
        type = "团队信息";
        store.dispatch(fetchTeam());
        store.dispatch(fetchUnJoinProject());
        store.dispatch(fetchMessages());
        break;
      case "project":
        type = "项目信息";
        store.dispatch(fetchProject());
        store.dispatch(fetchTeam());
        break;
      case "document":
        type = "文档信息";
        store.dispatch(fetchDocument());
        break;
      default:
        type = "";
    }
    const userId = localStorage.getItem("userId") || "";
    // 如果找到接受表中包含自己,那么就显示信息
    if (data.member.indexOf(userId) > -1) {
      notification.info({
        message: type,
        description: data.content,
        duration: 2
      });
    }
  });

  return store;
}
export default configureStore;

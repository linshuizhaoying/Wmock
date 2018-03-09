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
// import createSocketMiddleware from '../socket'
// const socketMiddleware = createSocketMiddleware();
const epicMiddleware = createEpicMiddleware(epics);
const socket = io(baseUrl);
socket.on("allMessage", (data: string) => {
  console.log("allMessage:", data);
});
socket.on("newMessage", (data: InstantMessage) => {
  console.log("服务器发信息啦", data);
  let type: string = "";
  switch (data.type) {
    case "team":
      type = "团队信息";
      break;
    case "project":
      type = "项目信息";
      break;
    default:
      type = "文档信息";
  }
  const userId = localStorage.getItem("userId") || "";
  if (data.member.indexOf(userId) > -1)
    notification.info({
      message: type,
      description: data.content,
      duration: 2
    });
});

export function configureStore(preloadState: {} = {}) {
  const store = createStore(
    reducers,
    preloadState,
    composeWithDevTools(
      applyMiddleware(thunk, logger, epicMiddleware)
      // (window as any).devToolsExtension && (window as any).devToolsExtension()
    )
  );

  return store;
}
export default configureStore;

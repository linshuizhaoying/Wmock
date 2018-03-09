import documentEpic from "./document";
import messagesEpic from "./messages";
import modelEpic from "./model";
import projectEpic from "./project";
import teamEpic from "./team";
import userEpic from "./user";

import { combineEpics } from "redux-observable";

export default combineEpics(
  userEpic,
  messagesEpic,
  projectEpic,
  documentEpic,
  teamEpic,
  modelEpic
);

import { combineReducers } from "redux";
import addreducer from "./addreducer";
import logreducer from "./logreducer";

const reducers = combineReducers({
  addreducer,
  logreducer
});

export default reducers;

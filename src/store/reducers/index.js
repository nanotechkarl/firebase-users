import userReducer from "./user";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  users: userReducer,
});

export default allReducers;

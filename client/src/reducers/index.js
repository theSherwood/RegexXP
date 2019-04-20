import { combineReducers } from "redux";
import challengeReducer from "./challengeReducer";
import authReducer from "./authReducer";

export default combineReducers({
  challenge: challengeReducer,
  auth: authReducer
});

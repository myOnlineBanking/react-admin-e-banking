import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import transferReducer from "./transferReducer";
import accountReducer from "./accountReducer";
import cardReducer from "./cardReducer";
import agencyReducer from "./agencyReducer";
export default combineReducers({
  authReducer,
  userReducer,
  transferReducer ,
  accountReducer,
  cardReducer,
  agencyReducer
});

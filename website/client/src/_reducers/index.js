import { combineReducers } from "redux";
import user from "./user_reducer";
import button from "./button_reducer";

const rootReducer = combineReducers({
  user,
  button,
});

export default rootReducer;

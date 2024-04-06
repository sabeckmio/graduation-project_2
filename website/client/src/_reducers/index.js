import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./user_reducer";
import button from "./button_reducer";
import chatbot from "./chatbot_reducer";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  user,
  button,
  chatbot,
});

export default persistReducer(persistConfig, rootReducer);

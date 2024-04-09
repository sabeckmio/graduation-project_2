import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import user from "./user_reducer";
import button from "./button_reducer";
import chatbot from "./chatbot_reducer";

const persistConfig = {
  key: "root",
  storage: storageSession,
};
const rootReducer = combineReducers({
  user,
  button,
  chatbot,
});

export default persistReducer(persistConfig, rootReducer);

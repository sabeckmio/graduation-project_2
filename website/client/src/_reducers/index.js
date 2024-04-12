import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import user from "./user_reducer";
import button from "./button_reducer";
import chatbot from "./chatbot_reducer";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
  button,
  chatbot,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;

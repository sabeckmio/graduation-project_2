import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
// import "antd/dist/antd.css";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { thunk } from "redux-thunk";
import Reducer from "./_reducers";
import { BrowserRouter } from "react-router-dom";

const createStoreWitMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider
        store={createStoreWitMiddleware(
          Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

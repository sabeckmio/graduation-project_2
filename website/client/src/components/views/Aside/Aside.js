import React from "react";
import Auth from "../../../hoc/auth";
import "./Aside.css";

function Aside() {
  return (
    <div className="Aside-div">
      <div className="Aside-ChatList"></div>
    </div>
  );
}

export default Auth(Aside, true);

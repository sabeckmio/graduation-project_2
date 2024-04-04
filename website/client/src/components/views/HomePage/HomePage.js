import React, { useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import "./HomePage.css";
import Auth from "../../../hoc/auth";
import { useSelector } from "react-redux";

function HomePage() {
  const btnType = useSelector((state) => state.button.btnType);

  return (
    <div className="Home-div">
      <div className="Home-Header">
        <Header />
      </div>
      <div className="Home-main">
        <div className="Home-Aside">
          <Aside />
        </div>
        <div
          className="Home-LandingPage"
          style={{ display: btnType === "home" ? "" : "none" }}
        >
          <LandingPage />
        </div>
      </div>
    </div>
  );
}

export default Auth(HomePage, true);

import React, { useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import DoitPage from "../DoitPage/DoitPage";
import AboutUsPage from "../AboutUsPage/AboutUsPage";
import InformationPage from "../InformationPage/InformationPage";
import Header from "../Header/Header";
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
        <div
          className="Home-LandingPage"
          style={{ display: btnType === "홈" ? "" : "none" }}
        >
          <LandingPage />
        </div>
        <div
          className="Home-LandingPage"
          style={{ display: btnType === "할일" ? "" : "none" }}
        >
          <DoitPage />
        </div>
        <div
          className="Home-LandingPage"
          style={{ display: btnType === "상담" ? "" : "none" }}
        >
          <InformationPage />
        </div>
        <div
          className="Home-LandingPage"
          style={{ display: btnType === "더 알아보기" ? "" : "none" }}
        >
          <AboutUsPage />
        </div>
      </div>
    </div>
  );
}

export default Auth(HomePage, true);

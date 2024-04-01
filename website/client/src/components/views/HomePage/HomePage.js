import React from "react";
import LandingPage from "../LandingPage/LandingPage";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import "./HomePage.css";
import Auth from "../../../hoc/auth";

function HomePage() {
  return (
    <div className="Home-div">
      <Header className="Home-Header"></Header>
      <main className="Home-main">
        <div className="Home-Aside">
          <Aside></Aside>
        </div>
        <div className="Home-LandingPage">
          <LandingPage></LandingPage>
        </div>
      </main>
    </div>
  );
}

export default Auth(HomePage, true);

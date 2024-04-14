import React, { useState } from "react";
import "./Header.css";
import HomeLogo from "../../../images/HomeLogo.png";
import en from "../../../images/en.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buttonType } from "../../../_actions/button_action";
import Auth from "../../../hoc/auth";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그아웃
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/");
        dispatch(buttonType("home"));
      } else {
        alert("Error");
      }
    });
  };

  const onButtonHomeHandler = () => {
    dispatch(buttonType("home"));
  };
  const onButtonDoitHandler = () => {
    dispatch(buttonType("할일"));
  };
  const onButtonInformationHandler = () => {
    dispatch(buttonType("정보"));
  };
  const onButtonAboutHandler = () => {
    dispatch(buttonType("about"));
  };

  return (
    <div className="Header-div">
      <div className="Header-Menu Header-Menu-left">
        <div>
          <img className="Header-img" alt="HomeLogo" src={HomeLogo}></img>
        </div>
        <div className="Header-Menu-button">
          <button className="Header-button" onClick={onButtonHomeHandler}>
            Home
          </button>
          <button className="Header-button" onClick={onButtonDoitHandler}>
            할일
          </button>
          <button
            className="Header-button"
            onClick={onButtonInformationHandler}
          >
            정보
          </button>
          <button className="Header-button" onClick={onButtonAboutHandler}>
            About Us
          </button>
        </div>
      </div>
      <div className="Header-Menu Header-Menu-button">
        <button className="Header-button Header-button-en">
          <img className="Header-button-en-img" src={en} alt="en"></img>En
        </button>
        <button
          className="Header-button Header-button-logout"
          onClick={onClickHandler}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Auth(Header, true);

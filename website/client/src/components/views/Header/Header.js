import React, { useState } from "react";
import "./Header.css";
import MainLogo from "../../../images/MainLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { buttonType } from "../../../_actions/button_action";
import Auth from "../../../hoc/auth";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const btnType = useSelector((state) => state.button.btnType);

  // 로그아웃
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/");
        dispatch(buttonType("홈"));
      } else {
        alert("Error");
      }
    });
  };

  const onButtonHomeHandler = () => {
    dispatch(buttonType("홈"));
  };
  const onButtonDoitHandler = () => {
    dispatch(buttonType("할일"));
  };
  const onButtonInformationHandler = () => {
    dispatch(buttonType("상담"));
  };
  const onButtonToliHandler = () => {
    dispatch(buttonType("토리꾸미기"));
  };
  const onButtonAboutHandler = () => {
    dispatch(buttonType("더 알아보기"));
  };

  return (
    <div className="Header-div">
      <div className="Header-Menu Header-Menu-left">
        <div>
          <img className="Header-img" alt="HomeLogo" src={MainLogo}></img>
        </div>
        <div className="Header-Menu-button">
          <button
            className="Header-button Header-Menu-button-margin"
            onClick={onButtonHomeHandler}
            style={{ color: btnType === "홈" ? "#73020C" : "white" }}
          >
            홈
          </button>
          <button
            className="Header-button Header-Menu-button-margin"
            onClick={onButtonDoitHandler}
            style={{ color: btnType === "할일" ? "#73020C" : "white" }}
          >
            할일
          </button>
          <button
            className="Header-button Header-Menu-button-margin"
            onClick={onButtonInformationHandler}
            style={{ color: btnType === "상담" ? "#73020C" : "white" }}
          >
            상담
          </button>
          <button
            className="Header-button Header-Menu-button-margin"
            onClick={onButtonToliHandler}
            style={{ color: btnType === "토리꾸미기" ? "#73020C" : "white" }}
          >
            토리꾸미기
          </button>
          <button
            className="Header-button Header-Menu-button-margin"
            onClick={onButtonAboutHandler}
            style={{ color: btnType === "더 알아보기" ? "#73020C" : "white" }}
          >
            더 알아보기
          </button>
        </div>
      </div>
      <div className="Header-Menu Header-Menu-button">
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

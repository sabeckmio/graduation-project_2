import React from "react";
import "./Header.css";
import HomeLogo from "../../../images/HomeLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

function Header(props) {
  const navigate = useNavigate();
  // 로그아웃
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div className="Header-div">
      <div className="Header-Menu Header-Menu-left">
        <div>
          <img className="Header-img" alt="HomeLogo" src={HomeLogo}></img>
        </div>
        <div className="Header-Menu-button">
          <button className="Header-button">Home</button>
          <button className="Header-button">할일</button>
          <button className="Header-button">정보</button>
          <button className="Header-button">About Us</button>
        </div>
      </div>
      <div className="Header-Menu Header-Menu-button">
        <button className="Header-button">En</button>
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

import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

function LandingPage() {
  const navigate = useNavigate();

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default Auth(LandingPage, true);

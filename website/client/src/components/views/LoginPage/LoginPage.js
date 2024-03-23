import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import Auth from "../../../hoc/auth";
import "./LoginPage.css";

function LoginPage() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHander = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/main");
      } else {
        alert("일치하는 회원정보가 없습니다");
      }
    });
  };
  const onMoveRegisterHander = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-div">
      <div className="login-header">
        <h1>로그인</h1>
      </div>
      <form className="login-form" onSubmit={onSubmitHander}>
        <label className="login-label">이메일</label>
        <input
          className="login-input"
          placeholder="이메일을 입력하세요"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <label className="login-label">비밀번호</label>
        <input
          className="login-input"
          placeholder="비밀번호를 입력하세요"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />
        <button className="login-button">로그인</button>
      </form>
      <div className="login-navigate">
        <button className="login-navigate-button">비밀번호 찾기</button>
        <button
          className="login-navigate-button"
          onClick={onMoveRegisterHander}
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
}

export default Auth(LoginPage, false);

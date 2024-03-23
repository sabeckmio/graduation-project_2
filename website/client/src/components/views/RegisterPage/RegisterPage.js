import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import "./RegisterPage.css";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHander = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <div className="register-div">
      <div className="login-header">
        <h1>회원가입</h1>
      </div>
      <form className="register-form" onSubmit={onSubmitHander}>
        <label className="register-label">이메일</label>
        <input
          placeholder="이메일을 입력해주세요"
          className="register-input"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />

        <label className="register-label">이름</label>
        <input
          placeholder="이름을 입력해주세요"
          className="register-input"
          type="text"
          value={Name}
          onChange={onNameHandler}
        />

        <label className="register-label">비밀번호</label>
        <input
          placeholder="비밀번호를 입력해주세요"
          className="register-input"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />

        <label className="register-label">비밀번호 확인</label>
        <input
          placeholder="비밀번호를 다시 한번 입력해주세요"
          className="register-input"
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <button className="register-button">회원 가입</button>
      </form>
    </div>
  );
}

export default Auth(RegisterPage, false);

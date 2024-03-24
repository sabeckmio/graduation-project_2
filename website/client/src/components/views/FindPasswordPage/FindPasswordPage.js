import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import Auth from "../../../hoc/auth";
import "./FindPasswordPage.css";

function FindPasswordPage() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmitHander = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    // let body = {
    //   email: Email,
    //   password: Password,
    // };

    // dispatch(loginUser(body)).then((response) => {
    //   if (response.payload.loginSuccess) {
    //     navigate("/main");
    //   } else {
    //     alert("일치하는 회원정보가 없습니다");
    //   }
    // });
  };

  return (
    <div className="find-password-div">
      <div className="find-password-header">
        <h1>비밀번호 찾기</h1>
      </div>
      <form className="find-password-form" onSubmit={onSubmitHander}>
        <label className="find-password-label">이메일</label>
        <input
          className="find-password-input"
          placeholder="이메일을 입력하세요"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <button
          className="find-password-button"
          disabled={Email === "" || Password.length < 8 ? true : false}
        >
          다음
        </button>
      </form>
    </div>
  );
}

export default Auth(FindPasswordPage, false);

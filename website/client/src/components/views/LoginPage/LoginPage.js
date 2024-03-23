import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import Auth from "../../../hoc/auth";

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
        navigate("/");
      } else {
        alert("일치하는 회원정보가 없습니다");
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHander}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Auth(LoginPage, null);

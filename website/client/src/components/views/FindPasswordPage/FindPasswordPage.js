import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findEamil } from "../../../_actions/user_action";
import Auth from "../../../hoc/auth";
import "./FindPasswordPage.css";
import axios from "axios";

function FindPasswordPage() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Num, setNum] = useState("");
  const [UserNum, setUserNum] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [CheckEamil, setCheckEmail] = useState(false);
  const [CheckNum, setCheckNum] = useState(false);
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onUserNumHandler = (event) => {
    setUserNum(event.currentTarget.value);
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
    // 이메일이 존재하는지 확인

    let body = {
      email: Email,
    };

    //해당 이메일이 존재하는지 찾아봄
    axios.get("api/users/find-email", { params: body }).then((response) => {
      //만약에 존재하면
      if (response.data.findemail) {
        axios.post("api/users/send-email", body).then((response) => {
          setCheckEmail(true);
          let number = response.data;
          setNum(number.num);
        });
      } else {
        //존재하지 않을때
        alert("존재하지 않는 이메일입니다.");
      }
    });

    // dispatch(findEamil({ params: { email: Email } })).then((response) => {
    //   console.log(response.payload.findemail);

    //   // if (response.payload.loginSuccess) {
    //   //   navigate("/main");
    //   // } else {
    //   //   alert("일치하는 회원정보가 없습니다");
    //   // }
    // });
  };

  const onCheckHander = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    //인증번호가 동일한지 확인
    if (Number(UserNum) === Number(Num)) {
      setCheckNum(true);
    } else {
      console.log("사용자가 입력한 " + UserNum);
      console.log("원래 번호는 " + Num);
      alert("인증번호가 동일하지 않습니다.");
    }
  };

  const onResendHandler = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    let body = {
      email: Email,
    };

    axios.post("api/users/send-email", body).then((response) => {
      let number = response.data;
      setNum(number.num);
      alert("인증번호가 다시 발급되었습니다");
    });
  };

  const onChangePasswordHandler = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    axios
      .post("/api/users/modify-password", body)
      .then(() => {
        alert("비밀번호가 변경되었습니다");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="find-password-div">
      <div className="find-password-header">
        <h1>비밀번호 찾기</h1>
      </div>
      {/* 이메일 입력 */}
      <form
        className="find-password-form"
        onSubmit={onSubmitHander}
        style={{ display: CheckEamil ? "none" : "" }}
      >
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
          disabled={Email === "" ? true : false}
        >
          다음
        </button>
      </form>

      {/* 이메일 인증 */}
      <form
        className="find-password-form"
        onSubmit={onCheckHander}
        style={{
          display:
            CheckEamil && !CheckNum
              ? ""
              : CheckEamil && CheckNum
              ? "none"
              : "none",
        }}
      >
        <label className="find-password-label">인증번호</label>
        <input
          className="find-password-input find-password-number-input"
          placeholder="인증번호를 입력하세요"
          type="number"
          value={UserNum}
          onChange={onUserNumHandler}
        />

        <button
          className="find-password-button"
          disabled={UserNum === "" ? true : false}
        >
          다음
        </button>
      </form>
      <button
        className="find-password-resend-button"
        onClick={onResendHandler}
        style={{
          display:
            CheckEamil && !CheckNum
              ? ""
              : CheckEamil && CheckNum
              ? "none"
              : "none",
        }}
      >
        이메일 재전송
      </button>

      {/* 비밀번호 변경 */}
      <form
        className="find-password-form"
        onSubmit={onChangePasswordHandler}
        style={{ display: CheckEamil && CheckNum ? "" : "none" }}
      >
        <label className="find-password-label">새로운 비밀번호</label>
        <input
          className="find-password-input"
          placeholder="새로운 비밀번호를 입력하세요"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />
        <label className="find-password-label">비밀번호 확인</label>
        <input
          className="find-password-input"
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <button
          className="find-password-button"
          disabled={Password === "" || ConfirmPassword === "" ? true : false}
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}

export default Auth(FindPasswordPage, null);

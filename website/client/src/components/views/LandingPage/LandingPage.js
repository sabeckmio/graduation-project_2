import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [MessageList, setMessageList] = useState([
    { number: 1, content: "그래요" },
  ]);
  const [Message, setMessage] = useState("");
  let Number = 1;

  const onMessageHandler = (event) => {
    setMessage(event.currentTarget.value);
  };

  // 전송
  const onSendHandler = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    setMessageList((list) => [
      ...list,
      { number: Number + 1, content: Message },
    ]);

    Number += 1;
    setMessage("");
  };
  const onSendPressHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSendHandler(e);
    }
  };

  const messageList = MessageList.map((message, index) => (
    <div className="landing-line" key={index}>
      <span className="landing-chat-box landing-mine">{message.content}</span>
    </div>
  ));

  return (
    <div className="landing-div">
      <div className="landing-chat-content">
        {/* 챗봇 메시지 */}
        <div className="landing-line">
          <span className="landing-chat-box">안녕?</span>
        </div>
        {/* 사용자 메시지 */}
        {messageList}
      </div>
      <div className="landing-input">
        <input
          className="landing-chat-box landing-chat-box-input"
          value={Message}
          onChange={onMessageHandler}
          onKeyDown={onSendPressHandler}
        />
        <button className="landing-send" onClick={onSendHandler}>
          전송
        </button>
      </div>
    </div>
  );
}

export default Auth(LandingPage, true);

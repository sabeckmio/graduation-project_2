import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import "./LandingPage.css";
import send from "../../../images/send.png";
import { useDispatch, useSelector } from "react-redux";
import { getChatGptMsg } from "../../../_actions/chatbot_action";

function LandingPage() {
  const dispatch = useDispatch();

  const userid = useSelector((state) => state.user.loginSuccess.userId);

  const [MessageList, setMessageList] = useState([]);
  const [Message, setMessage] = useState("");

  const onMessageHandler = (event) => {
    setMessage(event.currentTarget.value);
  };

  // 전송
  const onSendHandler = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    let newMessage = { content: Message, role: 0 };
    setMessageList((list) => [...list, newMessage]);

    let body = {
      userid: userid,
      content: Message,
    };

    if (userid !== undefined) {
      // gpt에서 대답을 받아옴

      dispatch(getChatGptMsg(body)).then((response) => {
        let responseMessage = { content: response.payload.msg, role: 1 };
        setMessageList((list) => [...list, responseMessage]);
      });
    } else {
      alert("메시지를 받아오는데 문제가 있습니다");
    }

    setMessage("");
  };
  //엔터 누르면 전송
  const onSendPressHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSendHandler(e);
    }
  };

  // eslint-disable-next-line array-callback-return
  const msgList = MessageList.map((message, index) => {
    // 나의 대화
    if (message.role === 0) {
      return (
        <div className="landing-line" key={index}>
          <span className="landing-chat-box landing-mine">
            {message.content}
          </span>
        </div>
      );
    }
    // 챗봇 대화
    else {
      return (
        <div className="landing-line" key={index}>
          <span className="landing-chat-box">{message.content}</span>
        </div>
      );
    }
  });

  return (
    <div className="landing-div">
      <div className="landing-chat-content">{msgList}</div>
      <div className="landing-input">
        <input
          className="landing-chat-box landing-chat-box-input"
          value={Message}
          onChange={onMessageHandler}
          onKeyDown={onSendPressHandler}
        />
        <button className="landing-send" onClick={onSendHandler}>
          <img className="landing-send-img" src={send} alt="send"></img>
        </button>
      </div>
    </div>
  );
}

export default Auth(LandingPage, true);

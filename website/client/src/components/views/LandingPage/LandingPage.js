import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import "./LandingPage.css";
import send from "../../../images/send.png";
import { useDispatch, useSelector } from "react-redux";
import { getChatGptMsg, getPart } from "../../../_actions/chatbot_action";

function LandingPage() {
  const dispatch = useDispatch();

  const userid = useSelector((state) => state.user.userid);
  const part_length = useSelector((state) => state.chatbot.part);

  const [MessageList, setMessageList] = useState([]);
  const [Message, setMessage] = useState("");

  const onMessageHandler = (event) => {
    setMessage(event.currentTarget.value);
  };

  // 전송
  const onSendHandler = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();
    const length = part_length.length;
    setMessageList((list) => [...list, { content: Message, role: 1 }]);

    let body = {
      userid: userid,
      content: Message,
      part: length,
    };

    // gpt에서 대답을 받아옴
    dispatch(getChatGptMsg(body)).then((response) => {
      setMessageList((list) => [
        ...list,
        { content: response.payload.msg, role: 0 },
      ]);
    });

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
    if (message.role === 1) {
      return (
        <div className="landing-line" key={index}>
          <span className="landing-chat-box landing-mine">
            {message.content}
          </span>
        </div>
      );
    } else {
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

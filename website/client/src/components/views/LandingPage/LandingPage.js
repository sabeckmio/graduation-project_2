import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import "./LandingPage.css";
import send from "../../../images/send.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatGptMsg,
  getPart,
  getPart_modify,
  getTalk,
} from "../../../_actions/chatbot_action";
import { loadTalk } from "../../../_actions/button_action";

function LandingPage() {
  const dispatch = useDispatch();

  const userid = useSelector((state) => state.user.loginSuccess.userId);
  const part = useSelector((state) => state.chatbot.part);
  const index = useSelector((state) => state.button.index);

  const [MessageList, setMessageList] = useState([]);
  const [Message, setMessage] = useState("");

  const onMessageHandler = (event) => {
    setMessage(event.currentTarget.value);
  };

  // 전송
  const onSendHandler = (event) => {
    //페이지 리프레시를 막기 위해
    event.preventDefault();

    const length = index !== -1 ? index : part.part[part.length - 1] + 1;

    let newMessage = { content: Message, role: 0 };

    if (index === -1) {
      dispatch(
        getPart_modify({
          part: [...part.part, length],
          length: part.length + 1,
        })
      );
      dispatch(loadTalk(length));
    } else {
      setMessageList((list) => [...list, newMessage]);
    }

    let body = {
      userid: userid,
      content: Message,
      part: length,
    };

    if (userid !== undefined) {
      // gpt에서 대답을 받아옴

      dispatch(getChatGptMsg(body)).then((response) => {
        let responseMessage = { content: response.payload.msg, role: 1 };
        if (index === -1) setMessageList((list) => [...list, newMessage]);
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

  useEffect(() => {
    // 삭제된 대화일 경우 채팅 기록 초기화
    if (part.length === 0 || !part.part.includes(index)) {
      setMessageList([]);
      return;
    }
    // 유저가 존재하고, 지난대화가 존재하며, 지난대화를 클릭했을 때
    if (userid !== undefined && part.length !== 0 && index !== -1) {
      let body = {
        userid: userid,
        part: index,
      };
      // 해당 대화를 불러옴
      dispatch(getTalk(body)).then((response) => {
        const arr = response.payload;
        setMessageList([]);

        // 불러온 대화를 배열에 넣음
        arr.map((value, index) => {
          return setMessageList((list) => [
            ...list,
            { content: value.content, role: value.role },
          ]);
        });
      });
    } else if (userid !== undefined && part.length !== 0 && index === -1) {
      setMessageList([]);
    }
  }, [index, dispatch, userid, part]);

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

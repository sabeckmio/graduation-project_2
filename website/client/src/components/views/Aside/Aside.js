import React, { useState } from "react";
import Auth from "../../../hoc/auth";
import "./Aside.css";
import { useDispatch, useSelector } from "react-redux";
import { loadTalk } from "../../../_actions/button_action";
import { deleteTalk, getPart } from "../../../_actions/chatbot_action";

function Aside() {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.userid);
  const part = useSelector((state) => state.chatbot.part.part);
  const index = useSelector((state) => state.button.index);

  // 클릭된 메시지의 인덱스를 상태로 저장
  const [clickedIndex, setClickedIndex] = useState(-1);

  // 지난대화버튼
  const onButtonClick = (message) => (event) => {
    event.preventDefault();
    // 클릭된 메시지의 인덱스를 업데이트
    setClickedIndex(message);
    dispatch(loadTalk(message));
  };
  // 지난대화 삭제버튼
  const onDeleteButton = (message) => (event) => {
    event.preventDefault();
    event.stopPropagation(); //중첩된 버튼을 해제

    if (window.confirm("해당 대화를 삭제하시겠습니까?")) {
      let body = {
        userid: userid,
        part: message,
      };

      console.log(userid);
      dispatch(deleteTalk(body));
      dispatch(getPart(userid));

      // 삭제된 대화가 현재 렌더링되는 대화인 경우 클릭된 인덱스 초기화
      if (message === index) setClickedIndex(-1);
    }
  };
  // 새로운 대화 추가 버튼
  const onNewTalkButton = (event) => {
    event.preventDefault();
    setClickedIndex(-1);
    dispatch(loadTalk(-1));
    dispatch(getPart(userid));
  };

  // 지난대화 목록
  const msgList = part.map((message, index) => (
    <div
      key={index}
      className={`Aside-ChatList-div ${
        clickedIndex === message ? "Aside-ChatList-true" : ""
      }`}
      onClick={onButtonClick(message)}
    >
      지난대화 {index + 1}
      <button
        className="Aside-ChatList-btn-mini"
        onClick={onDeleteButton(message)}
      >
        X
      </button>
    </div>
  ));

  return (
    <div className="Aside-div">
      <div className="Aside-ChatList">
        <div className="Aside-ChatList-div-plus" onClick={onNewTalkButton}>
          +
        </div>
        {msgList}
      </div>
    </div>
  );
}

export default Auth(Aside, true);

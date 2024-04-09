import React, { useState } from "react";
import Auth from "../../../hoc/auth";
import "./Aside.css";
import { useDispatch, useSelector } from "react-redux";
import { loadTalk } from "../../../_actions/button_action";

function Aside() {
  const dispatch = useDispatch();
  const part = useSelector((state) => state.chatbot.part.part);
  const a = useSelector((state) => state.button.btnType);
  console.log(part);

  // 클릭된 메시지의 인덱스를 상태로 저장
  const [clickedIndex, setClickedIndex] = useState(-1);

  // 지난대화버튼
  const onButtonClick = (index) => (event) => {
    event.preventDefault();
    // 클릭된 메시지의 인덱스를 업데이트
    setClickedIndex(index);
    dispatch(loadTalk(index));
  };
  // 지난대화 삭제버튼
  const onDeleteButton = (event) => {
    event.preventDefault();
    event.stopPropagation(); //중첩된 버튼을 해제
  };
  // 새로운 대화 추가 버튼
  const onNewTalkButton = (event) => {
    event.preventDefault();
    setClickedIndex(-1);
    dispatch(loadTalk(-1));
  };

  const msgList = part.map((message, index) => (
    <div
      key={index}
      className={`Aside-ChatList-div ${
        clickedIndex === index ? "Aside-ChatList-true" : ""
      }`}
      onClick={onButtonClick(index)}
    >
      지난대화 {message + 1}
      <button className="Aside-ChatList-btn-mini" onClick={onDeleteButton}>
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

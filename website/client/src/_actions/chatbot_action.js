import axios from "axios";
import {
  GET_ALL_MESSAGE,
  DELETE_ALL_MESSAGE,
  POST_TALK_USER,
  POST_TALK_CHATBOT,
} from "./types";

// 사용자 대화 넣고 가져오기
export function postTalkUser(data) {
  const request = axios
    .post("/api/chat/postTalk/user", data)
    .then((response) => response.data);
  return {
    type: POST_TALK_USER,
    payload: request,
  };
}

// 챗봇 대화 넣고 가져오기
export function postTalkChatbot(data) {
  const request = axios
    .post("/api/chat/postTalk/chatbot", data)
    .then((response) => response.data);
  return {
    type: POST_TALK_CHATBOT,
    payload: request,
  };
}
// 해당되는 지난 대화 모두 가져오기
export function getTalk(userid) {
  const params = { userid: userid };
  const request = axios
    .get("/api/chat/getTalk", { params })
    .then((response) => response.data.list);
  return {
    type: GET_ALL_MESSAGE,
    payload: request,
  };
}

// 해당되는 지난 대화 모두 삭제하기
export function deleteTalk(body) {
  let params = {
    userid: body.userid,
    part: body.part,
  };
  const request = axios
    .delete("/api/chat/deleteTalk", { params })
    .then((response) => response.data);
  return {
    type: DELETE_ALL_MESSAGE,
    payload: request,
  };
}

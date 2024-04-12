import axios from "axios";
import {
  GET_PART,
  GET_ALL_MESSAGE,
  GET_CHATGPT_MESSAGE,
  DELETE_ALL_MESSAGE,
} from "./types";

//대화방 갯수 가져오기
export function getPart(userid) {
  const params = { userid: userid };
  const request = axios
    .get("/api/chat/part", { params })
    .then((response) => response.data);
  return {
    type: GET_PART,
    payload: request,
  };
}

export function getPart_modify(body) {
  return {
    type: GET_PART,
    payload: body,
  };
}

//챗지피티 대화 가져오기
export function getChatGptMsg(data) {
  const request = axios
    .post("/api/chat/chatgpt", data)
    .then((response) => response.data);
  return {
    type: GET_CHATGPT_MESSAGE,
    payload: request,
  };
}

// 해당되는 지난 대화 모두 가져오기
export function getTalk(body) {
  const params = body;
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

import axios from "axios";
import { GET_PART, GET_ALL_MESSAGE, GET_CHATGPT_MESSAGE } from "./types";

//대화방 갯수 가져오기
export function getPart(userid) {
  const params = { userid: userid };
  const request = axios
    .get("/api/users/part", { params })
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
    .post("/api/users/chatgpt", data)
    .then((response) => response.data);
  return {
    type: GET_CHATGPT_MESSAGE,
    payload: request,
  };
}

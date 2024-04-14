import {
  DELETE_ALL_MESSAGE,
  GET_ALL_MESSAGE,
  GET_CHATGPT_MESSAGE,
} from "../_actions/types";

export default function chatbot(state = { answer: [] }, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CHATGPT_MESSAGE:
      return {
        ...state,
        userid: action.userid,
        gpt_answer: action.payload,
      };
    case GET_ALL_MESSAGE:
      return {
        ...state,
        answer: action.payload,
      };
    case DELETE_ALL_MESSAGE:
      return {
        ...state,
        delete: action.payload,
      };
    default:
      return state;
  }
}

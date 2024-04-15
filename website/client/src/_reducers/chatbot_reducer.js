import {
  DELETE_ALL_MESSAGE,
  GET_ALL_MESSAGE,
  POST_TALK_CHATBOT,
  POST_TALK_USER,
} from "../_actions/types";

export default function chatbot(state = { answer: [] }, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case POST_TALK_USER:
      return {
        ...state,
        message: action.payload,
      };
    case POST_TALK_CHATBOT:
      return {
        ...state,
        message: action.payload,
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

import { GET_CHATGPT_MESSAGE, GET_PART, GET_USERID } from "../_actions/types";

export default function chatbot(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_USERID:
      return {
        ...state,
        userid: action.userid,
      };
    case GET_PART:
      return {
        ...state,
        userid: action.userid,
        part: action.payload,
      };
    case GET_CHATGPT_MESSAGE:
      return {
        ...state,
        userid: action.userid,
        answer: action.payload,
      };

    default:
      return state;
  }
}

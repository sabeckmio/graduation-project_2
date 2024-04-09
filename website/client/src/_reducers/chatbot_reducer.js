import { GET_CHATGPT_MESSAGE, GET_PART } from "../_actions/types";

export default function chatbot(
  state = { part: { part: [], length: 0 } },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
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

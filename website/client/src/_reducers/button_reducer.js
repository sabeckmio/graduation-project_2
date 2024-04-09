import { BUTTON_TYPE, LOAD_TALK } from "../_actions/types";

export default function buttonType(state = { btnType: "home" }, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case BUTTON_TYPE:
      return {
        ...state,
        btnType: action.btnType,
      };
    case LOAD_TALK: {
      return {
        ...state,
        index: action.index,
      };
    }
    default:
      return state;
  }
}

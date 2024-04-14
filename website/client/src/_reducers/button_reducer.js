import { BUTTON_TYPE } from "../_actions/types";

export default function buttonType(state = { btnType: "홈" }, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case BUTTON_TYPE:
      return {
        ...state,
        btnType: action.btnType,
      };
    default:
      return state;
  }
}

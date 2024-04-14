import { BUTTON_TYPE } from "./types";

export function buttonType(btnType) {
  return {
    type: BUTTON_TYPE,
    btnType: btnType,
  };
}

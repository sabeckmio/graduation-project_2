import { BUTTON_TYPE, LOAD_TALK } from "./types";

export function buttonType(btnType) {
  return {
    type: BUTTON_TYPE,
    btnType: btnType,
  };
}

export function loadTalk(index) {
  return {
    type: LOAD_TALK,
    index: index,
  };
}

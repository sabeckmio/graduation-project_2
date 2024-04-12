import { BUTTON_TYPE, LOAD_TALK } from "./types";

export function buttonType(btnType) {
  return {
    type: BUTTON_TYPE,
    btnType: btnType,
  };
}

// 현재 선택한 메세지 / 이전 메세지 선택할 때
export function loadTalk(index) {
  return {
    type: LOAD_TALK,
    index: index,
  };
}

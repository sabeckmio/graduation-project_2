import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  FIND_EMAIL,
} from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload, userid: action.payload._id };
    case FIND_EMAIL:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}

// export default function (state = {}, action) {
//   switch (action.type) {
//     case LOGIN_USER:
//       return { ...state, loginSuccess: action.payload };
//     default:
//       return state;
//   }
// }

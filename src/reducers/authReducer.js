import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, ERROR_ACTION } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = JSON.parse(localStorage.getItem("token")) || null;

const isAuthenticated = !!(user && token);

const initialState = {
  isAuthenticated: isAuthenticated,
  user: isAuthenticated ? user : null,
  token: isAuthenticated ? token : null,
  error: "",
  message: ""
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        error: "",
      };

    case AUTH_REGISTER:
      return {
        ...state,
        message: payload,
      }

    case AUTH_LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        error: "",
        message: ""
      }

    case ERROR_ACTION:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}

export default authReducer;

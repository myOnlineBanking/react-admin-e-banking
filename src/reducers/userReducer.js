import { DISABLE_USER, ENABLE_USER, FETCH_USER, FETCH_USERS, UPDATE_USER } from "../actions/types";

const initialState = {
  users: [],
  user: {},
  
  sidebarShow: true,
  sidebarUnfoldable: true,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USERS:
      return {
        ...state,
        users: payload["users"],
      };

    case FETCH_USER:
      return {
        ...state,
        user: payload["user"],
      };

    case UPDATE_USER:
      return {
        ...state,
        user: payload["user"],
      };

    case ENABLE_USER:
      return {
        ...state,
        user: payload["user"],
      };

    case DISABLE_USER:
      return {
        ...state,
        user: payload["user"],
      };

    case "set":
      return { ...state, sidebarShow: !payload, sidebarUnfoldable: false };

    default:
      return state;
  }
};

export default userReducer;

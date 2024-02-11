import { FETCH_AGENCIES } from "src/actions/types";

const initialState = {
  agencies: [],
};

const agencyReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_AGENCIES:
      return { ...state, agencies: payload["items"] };

    default:
      return { ...state };
  }
};

export default agencyReducer;

import {
  CREATE_TRANSFER,
  FETCH_TRANSFETS,
  SET_DATA_DESTINATAIRE,
  SET_DATA_SOURCE,
  SET_TRANSFERT_INFO,
} from "src/actions/types";

let initialState = {
  dataSource: { client: null, compte: null },
  dataDestination: { client: null, compte: null },
  transferInfo: {
    soustraction: "FROM_ME",
    price: 0,
    motif: "",
    operationType: "",
  },

  transfers: [],
};

const tranferReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DATA_SOURCE:
      return {
        ...state,
        dataSource: { ...state.dataSource, ...payload },
      };

    case SET_DATA_DESTINATAIRE:
      return {
        ...state,
        dataDestination: { ...state.dataDestination, ...payload },
      };

    case SET_TRANSFERT_INFO:
      return {
        ...state,
        transferInfo: {
          ...state.transferInfo,
          [payload["field"]]: payload["value"],
        },
      };

    case FETCH_TRANSFETS:
      return { ...state, transfers: payload["items"] };

    case CREATE_TRANSFER : 
     return { ...state, transfers: [...state.transfers, payload["item"]] };


    default:
      return state;
  }
};

export default tranferReducer;

import {
  FETCH_CARDS_BY_ACCOUNT_ID,
  SET_SELECTED_CARD,
  FETCH_CARDS_NOT_ACCEPTED,
  ACCEPT_CARD,
  DETAILS_CARD,
  UPDATE_CARD,
  ENABLE_DISABLE_CARD,
} from "src/actions/types";

const initialState = {
  cardsByUser: [],
  card: null,
  cardDetails: null,
  cardsNotAccepted: [],
};

const cardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  let cards = [];
  switch (type) {
    case FETCH_CARDS_BY_ACCOUNT_ID:
      return { ...state, cardsByUser: payload };

    case FETCH_CARDS_NOT_ACCEPTED:
      return { ...state, cardsNotAccepted: payload };

    case SET_SELECTED_CARD:
      return { ...state, card: payload };

    case ENABLE_DISABLE_CARD:
      cards = [];
      cards = state.cardsNotAccepted.map((el) =>
        el["id"] === payload["id"] ? { ...el, enabled: !el.enabled } : el
      );
      return { ...state, card: payload, cardsNotAccepted: cards };

    case ACCEPT_CARD:
      cards = [];
      cards = state.cardsNotAccepted.filter(
        (el) => el["cardNumber"] !== payload["cardNumber"]
      );
      return { ...state, cardsNotAccepted: cards };

    case DETAILS_CARD:
      return { ...state, cardDetails: payload };

    case UPDATE_CARD:
      cards = [];
      cards = state.cardsNotAccepted.map((el) =>
        el["cardNumber"] === payload["cardNumber"] ? { ...payload } : el
      ); 
      return { ...state, cardDetails: payload };

    default:
      return { ...state };
  }
};

export default cardReducer;

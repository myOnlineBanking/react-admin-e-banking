import CardService from "src/services/card.service";
import {
  ACCEPT_CARD,
  CREATE_CARD,
  ENABLE_DISABLE_CARD,
  ERROR_ACTION,
  FETCH_CARDS_BY_ACCOUNT_ID,
  FETCH_CARDS_NOT_ACCEPTED,
  UPDATE_CARD,
} from "./types";

export const fetchCardsByAccountId = (accountId) => async (dispatch) => {
  try {
    const { data, error } = await CardService.getCardsByAccountId(accountId);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: error.message,
      });
      return Promise.resolve(error);
    } else {
      dispatch({
        type: FETCH_CARDS_BY_ACCOUNT_ID,
        payload: data,
      });
      return Promise.resolve(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchCardsNotAccepted = () => async (dispatch) => {
  try {
    const { data, error } = await CardService.getCardsNoAccepted();
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: error.message,
      });
      return Promise.resolve(error);
    } else {
      dispatch({
        type: FETCH_CARDS_NOT_ACCEPTED,
        payload: data,
      });
      return Promise.resolve(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const enableOrDisableCardAction =
  ({ id, action }) =>
  async (dispatch) => {
    try {
      const { data, error } = await CardService.enableOrDisableCard({
        id,
        action,
      });
      if (error) {
        dispatch({
          type: ERROR_ACTION,
          payload: error.message,
        });
        return Promise.resolve(error);
      } else {
        dispatch({
          type: ENABLE_DISABLE_CARD,
          payload: { ...data, id },
        });
        return Promise.resolve(data);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const acceptCardAction = (cardId, cardNumber) => async (dispatch) => {
  try {
    const { data, error } = await CardService.acceptCard(cardId);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: error.message,
      });
      return Promise.resolve(error);
    } else {
      dispatch({
        type: ACCEPT_CARD,
        payload: { cardNumber },
      });
      return Promise.resolve(data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createCardAction = (card) => async (dispatch) => {
  try {
    const { data, error } = await CardService.createCard(card);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: error.message,
      });
      return Promise.reject(error);
    } else {
      dispatch({
        type: CREATE_CARD,
        payload: data,
      });
      return Promise.resolve(data);
    }
  } catch (error) {
    dispatch({
      type: ERROR_ACTION,
      payload: error,
    });
    return Promise.reject(error);
  }
};

export const updateCardAction = (card) => async (dispatch) => {
  try {
    const { data, error } = await CardService.updateCard(card);
    if (error) {
      dispatch({
        type: ERROR_ACTION,
        payload: error.message,
      });
      return Promise.reject(error);
    } else {
      dispatch({
        type: UPDATE_CARD,
        payload: data,
      });
      return Promise.resolve(data);
    }
  } catch (error) {
    dispatch({
      type: ERROR_ACTION,
      payload: error,
    });
    return Promise.reject(error);
  }
};

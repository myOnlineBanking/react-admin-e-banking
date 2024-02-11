import TransferService from "../services/TransferService";
import { CREATE_TRANSFER, ERROR_ACTION, FETCH_TRANSFETS } from "./types";

export const getListTransfersAction = () => async (dispatch) => {
  try {
    const { data, error } = await TransferService.getListTransfers();
    const params = {
      type: error ? ERROR_ACTION : FETCH_TRANSFETS,
      payload: error ? error : { items: data },
    };
    dispatch(params);
  } catch (error) {
    dispatch({ type: ERROR_ACTION, payload: error.message });
  }
};



export const createTransferAction = (payload) => async (dispatch) => {
  try {
    const { data, error } = await TransferService.createTransfer(payload);
    const params = {
      type: error ? ERROR_ACTION : CREATE_TRANSFER,
      payload: error ? error : { item: data },
    };
    dispatch(params);
  } catch (error) {
    dispatch({ type: ERROR_ACTION, payload: error.message });
  }
};

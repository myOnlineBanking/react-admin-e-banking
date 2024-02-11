import AgencyService from "src/services/agency.service";
import { CREATE_AGENCY, ERROR_ACTION, FETCH_AGENCIES } from "./types";

export const getListAgenciesAction = () => async (dispatch) => {
  try {
    const { data, error } = await AgencyService.getListAgencies();
    const params = {
      type: error ? ERROR_ACTION : FETCH_AGENCIES,
      payload: error ? error.message : { items: data },
    };
    dispatch(params);
  } catch (error) {
    dispatch({ type: ERROR_ACTION, payload: error });
  }
};

export const createAgencyAction = (agency) => async (dispatch) => {
  try {
    const { data, error } = await AgencyService.createAgency(agency);
    const action = {
      type: error ? ERROR_ACTION : CREATE_AGENCY,
      payload: error ? error.message : { item: data },
    };
    dispatch(action);
  } catch (error) {
    dispatch({ type: ERROR_ACTION, payload: error });
  }
};

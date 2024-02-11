import { AGENCY_URL } from ".";
import http from "../http-common";

class AgencyService {
  getAgencyById = async (agencyId) => {
    const { data, error } = await http.get(
      `${AGENCY_URL}getById?agencyId=${agencyId}`
    );
    return { data, error };
  };

  getListAgencies = async () => {
    const { data, error } = await http.get(AGENCY_URL + "getAll");
    return { data, error };
  };

  createAgency = async (agency) => {
    const { data, error } = await http.post(AGENCY_URL + "add", agency );
    return { data, error };
  };
}

export default new AgencyService();

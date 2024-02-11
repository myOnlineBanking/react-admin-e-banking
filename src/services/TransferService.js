import { TRANSFERT_AGENT_URL, TRANSFERT_CLIENT_URL } from ".";
import axios from "../http-common";

class TransferService {
  getListTransfers = async () => {
    const { data, error } = await axios.get(TRANSFERT_CLIENT_URL + "transfers");
    return { data, error };
  };
  

  createTransfer = async (transferInfo) => {
    const { data, error } = await axios.post(TRANSFERT_AGENT_URL + "transfer", {
      ...transferInfo,
    });
    return { data, error };
  }
}


export default new TransferService();

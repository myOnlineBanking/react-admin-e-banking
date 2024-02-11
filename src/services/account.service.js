import { ACCOUNT_URL } from ".";
import http from "../http-common";

class AccountService {
  getAccountByUser = async (userId) => {
    const { data, error } = await http.get(
      `${ACCOUNT_URL}getUserAccounts?userId=${userId}`
    );
    return { data, error };
  };

  enableOrDisableAccount = async ({ accountId, action }) => {
    const { data, error } = await http.post(`${ACCOUNT_URL}${action}`, {
      id: accountId,
    });
    return { data, error };
  };

  getListAccounts = async () => {
    const { data, error } = await http.get(ACCOUNT_URL + "getAll");
    return { data, error };
  };

  
}

export default new AccountService();

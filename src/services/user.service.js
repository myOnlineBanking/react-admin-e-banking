import { CLIENT_USER_URL } from ".";
import http from "../http-common";

class UserService {
  fetchUsers = async () => {
    let { data, error } = await http.get(CLIENT_USER_URL);
    let clients = [];
    data &&
      data.forEach((item) => {
        let client = {
          id: item["id"],
          cin: item["cin"],
          firstname: item["firstname"],
          username: item["username"],
          lastname: item["lastname"],
          email: item["email"],
          phone: item["phone"],
          enabled: item["enabled"],

          address: item["address"],
          agencyId: item["agencyId"],
          birthday: item["birthday"],
          deleted: item["deleted"],
          recipients: item["recipients"] || [],
          accounts: item["accounts"] || [],
        };
        clients = [...clients, { ...client }];
      });
    return { clients, error };
  };

  fetchUser = async (id) => {
    const { data, error } = await http.get(CLIENT_USER_URL + "/" + id);
    return { data, error };
  };

  updateUser = async (client) => {
    const { data, error } = await http.put(CLIENT_USER_URL + "/update", client);
    return { data, error };
  };
}

export default new UserService();

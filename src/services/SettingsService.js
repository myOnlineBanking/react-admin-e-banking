import http from "../http-common";
import { SETTING_URL } from "./index";

export const getParameter = async () => {
  return await http.get(SETTING_URL + "get") 
};

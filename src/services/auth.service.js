import { AUTH_URL } from ".";
import http from "../http-common";

 class AuthService {
  login = async (loginForm) => {
    const { data, error } = await http.post(AUTH_URL + 'signin', loginForm);
    return { data, error };
  };
  
  
  register = async (registerForm) => { 
    const { data, error } = await http.post(AUTH_URL+'signup' , registerForm);
    return { data, error };
  }


}

export default new AuthService();

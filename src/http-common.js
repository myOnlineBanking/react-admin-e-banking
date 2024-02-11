import axios from "axios";

const baseURL = "https://my-api-gateway-ttt.herokuapp.com/"
const instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default instance;

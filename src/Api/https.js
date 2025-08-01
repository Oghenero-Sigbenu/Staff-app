import axios from "axios";
// import { store } from "../Store/store";
const baseUrl = "https://api.exquisiteescape.com/api/admin";

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const logoutUser = () => {
  localStorage.removeItem("userToken"); // Remove token
  window.location.href = "/"; // Redirect to login page
};

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      // config.headers["Authorization"] = `${userToken}`;

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logoutUser();
    }
    return Promise.reject(error);
  }
);

export default http;

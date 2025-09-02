import axios from "axios";
// import { store } from "../Store/store";
const baseUrl = "https://api.exquisiteescape.com/api";

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "*/*",
    // ContentType: "application/json",
  },
  withCredentials: true,
});

const logoutUser = () => {
  localStorage.removeItem("userToken"); // Remove token
  window.location.href = "/"; // Redirect to login page
};

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    // if (token) {
    config.headers.authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "Error Response:",
        error.response.status,
        error.response.data
      );
    }

    if (error.response && error.response.status === 401) {
      logoutUser();
    }

    return Promise.reject(error);
  }
);

export default http;

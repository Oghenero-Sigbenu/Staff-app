import https from "../Api/https";
import { store } from "./store";

console.log(localStorage.getItem("userToken"));

// if (userToken) {
//   // config.headers["Authorization"] = `${userToken}`;
//   config.headers["Authorization"] = `Bearer ${userToken}`;
//   return config;
// }
export const fetchFlightOrders = () => https.get(`/flights`);

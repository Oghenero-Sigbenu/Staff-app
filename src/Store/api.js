import http from "../Api/https";

export const fetchFlightOrders = (page) =>
  http.get(`/admin/flights?page=${page}`);
export const fetchHotelsOrders = (page) =>
  http.get(`/admin/hotels?page=${page}`);
export const fetchToursOrders = (page) => http.get(`/admin/tours?page=${page}`);
export const fetchTransferOrders = (page) =>
  http.get(`/admin/transfers?page=${page}`);
export const fetchAllUsers = (page) => http.get(`/users?page=${page}`);

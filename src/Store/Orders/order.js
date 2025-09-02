// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  fetchAllUsers,
  fetchFlightOrders,
  fetchHotelsOrders,
  fetchToursOrders,
  fetchTransferOrders,
} from "../api";

export const getFlights = createAsyncThunk(
  "/orders/flights",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await fetchFlightOrders(currentPage);

      return response?.data?.data;
    } catch (error) {
      if (error.response && error?.response?.data.error) {
        toast.error(error?.response?.data?.error[0]?.message);
        toast.error("Error occured");
        return rejectWithValue(error?.response?.data?.error[0]?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getHotels = createAsyncThunk(
  "/orders/hotels",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await fetchHotelsOrders(currentPage);
      return response?.data?.data;
    } catch (error) {
      if (error.response && error?.response?.data.error) {
        toast.error(error?.response?.data?.error[0]?.message);
        toast.error("Error occured");
        return rejectWithValue(error?.response?.data?.error[0]?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getTours = createAsyncThunk(
  "/orders/Tours",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await fetchToursOrders(currentPage);
      return response?.data?.data;
    } catch (error) {
      if (error.response && error?.response?.data.error) {
        toast.error(error?.response?.data?.error[0]?.message);
        toast.error("Error occured");
        return rejectWithValue(error?.response?.data?.error[0]?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUsers = createAsyncThunk(
  "/orders/Users",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers(currentPage);
      return response?.data?.data;
    } catch (error) {
      if (error.response && error?.response?.data.error) {
        // toast.error(error?.response?.data?.error[0]?.message);
        toast.error("Error occured");
        return rejectWithValue(error?.response?.data?.error[0]?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getTransfers = createAsyncThunk(
  "/orders/transfers",
  async (currentPage, { rejectWithValue }) => {
    try {
      const response = await fetchTransferOrders(currentPage);
      return response?.data?.data;
    } catch (error) {
      if (error.response && error?.response?.data.error) {
        toast.error(error?.response?.data?.error[0]?.message);
        toast.error("Error occured");
        return rejectWithValue(error?.response?.data?.error[0]?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const initialState = {
  loading: false,
  flights: [],
  hotels: [],
  tours: [],
  transfers: [],
  users: [],
  error: null,
  success: false,
  isLoading: false,
  errorMsg: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFlights.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFlights.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.flights = action?.payload;
    });
    builder.addCase(getFlights.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getHotels.pending, (state) => {
      state.isLoading = true;
      state.errorMsg = null;
    });
    builder.addCase(getHotels.fulfilled, (state, action) => {
      state.success = true;
      state.isLoading = false;
      state.hotels = action?.payload;
    });
    builder.addCase(getHotels.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(getTours.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTours.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.tours = action?.payload;
    });
    builder.addCase(getTours.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.users = action?.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getTransfers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTransfers.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.transfers = action?.payload;
    });
    builder.addCase(getTransfers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;

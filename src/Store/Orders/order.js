// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchFlightOrders } from "../api";

export const getFlights = createAsyncThunk(
  "/flights",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetchFlightOrders();

      console.log(response);
      return response;
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
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFlights.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFlights.fulfilled, (state, action) => {
      state.success = true;
      state.flights = action?.payload;
    });
    builder.addCase(getFlights.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default orderSlice.reducer;

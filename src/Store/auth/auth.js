// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const backendURL = "https://api.exquisiteescape.com/api";

export const login = createAsyncThunk(
  "auth/signin",
  async ({ userDetail, navigate }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${backendURL}/user/signin`,
        userDetail,
        config
      );
      console.log(response);
      navigate("/dashboard/home");
      // const data = await response.json();

      toast.error("Login Successful");
      return response?.data;
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

// 🔹 Async action to handle logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("userToken");

    // Redirect to login (optional)
    window.location.href = "/";

    return true; // Success
  } catch (error) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.success = true;
      state.isAuthenticated = true;
      state.userToken = action?.payload?.jwt;
      console.log(action?.payload, 678);
      // Store user info in localStorage
      if (action.payload) {
        localStorage.setItem("userToken", action?.payload?.jwt);
      }
    });
    builder.addCase(login.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(logout.fulfilled, (state, payload) => {
      state.loading = false;
      state.userToken = null;
      state.isAuthenticated = false;
      state.error = payload?.payload;
      localStorage.clear();
    });
    builder.addCase(logout.rejected, (state, payload) => {
      state.loading = false;
      state.userToken = null;
      state.isAuthenticated = false;
      state.error = payload?.payload;
    });
  },
});

export default authSlice.reducer;

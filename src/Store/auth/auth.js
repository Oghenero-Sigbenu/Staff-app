// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const backendURL = "https://api.exquisiteescape.com/api";

// 🔹 Login async thunk
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

      // ✅ Fixed: Use response.data instead of response.json()
      const data = response.data;

      // Store token in localStorage for persistence
      if (data.jwt) {
        localStorage.setItem("userToken", data.jwt);
      }

      // Navigate after successful login
      navigate("/dashboard/home");

      // ✅ Fixed: Use toast.success for successful login
      toast.success("Login Successful");

      return data; // Return the actual data, not wrapped in object
    } catch (error) {
      let errorMessage = "Login failed";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error[0]?.message || "Login failed";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// 🔹 Logout async thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Remove token from localStorage
      localStorage.removeItem("userToken");

      // Clear any auth-related data
      localStorage.removeItem("userInfo");

      // Optional: Call logout API endpoint
      // await axios.post(`${backendURL}/user/logout`);

      toast.success("Logged out successfully");

      // Redirect to login
      window.location.href = "/";

      return true;
    } catch (error) {
      toast.error("Logout failed");
      return rejectWithValue("Logout failed");
    }
  }
);

// 🔹 Check if user is authenticated (from localStorage)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const userInfo = localStorage.getItem("userInfo");

      if (token) {
        // Optional: Verify token with backend
        // const response = await axios.get(`${backendURL}/user/verify`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });

        return {
          userToken: token,
          userInfo: userInfo ? JSON.parse(userInfo) : {},
          isAuthenticated: true,
        };
      }

      return rejectWithValue("No valid token found");
    } catch (error) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      return rejectWithValue("Authentication check failed");
    }
  }
);

// 🔹 Initial state
const initialState = {
  loading: false,
  userInfo: {},
  userToken: localStorage.getItem("userToken") || null,
  error: null,
  success: false,
  isAuthenticated: !!localStorage.getItem("userToken"),
};

// 🔹 Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    setCredentials: (state, action) => {
      const { userInfo, userToken } = action.payload;
      state.userInfo = userInfo;
      state.userToken = userToken;
      state.isAuthenticated = true;
      state.success = true;
      state.loading = false;
      state.error = null;
    },
    clearCredentials: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.isAuthenticated = false;
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userToken = action.payload.jwt;
        state.userInfo = action.payload.user || action.payload;
        state.isAuthenticated = true;
        state.error = null;

        // Store user info in localStorage
        if (action.payload.user) {
          localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.isAuthenticated = false;
        state.userToken = null;
        state.userInfo = {};
      })

      // Logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userToken = null;
        state.userInfo = {};
        state.isAuthenticated = false;
        state.success = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still clear auth data even if logout API fails
        state.userToken = null;
        state.userInfo = {};
        state.isAuthenticated = false;
      })

      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload.userToken;
        state.userInfo = action.payload.userInfo;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userToken = null;
        state.userInfo = {};
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { clearError, resetSuccess, setCredentials, clearCredentials } =
  authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserToken = (state) => state.auth.userToken;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;

// store/index.js or store/store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

// Import reducers
import authReducer from "./auth/auth";
import orderReducer from "./Orders/order";

// Redux Persist Config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"], // Only persist auth
  // Add blacklist if needed
  // blacklist: ['order'], // Don't persist order
};

// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Add ignored paths if you have non-serializable data
        ignoredPaths: ["register"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Create Persistor
const persistor = persistStore(store);

// Default exports
export { store, persistor };

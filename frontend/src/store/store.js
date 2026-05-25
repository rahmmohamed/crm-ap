import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import customersReducer from "../features/customers/customersSlice.js";
import productsReducer from "../features/products/productsSlice.js";
import dealsReducer from "../features/deals/dealsSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    products: productsReducer,
    deals: dealsReducer,
  },
});

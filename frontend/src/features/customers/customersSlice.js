import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../app/api.js";

export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  return await apiRequest("/customers");
});

export const addCustomer = createAsyncThunk(
  "customers/add",
  async ({ name, email, phone }) => {
    return await apiRequest("/customers", {
      method: "POST",
      body: JSON.stringify({ name, email, phone }),
    });
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default customersSlice.reducer;

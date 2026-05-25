import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../app/api.js";

export const fetchDeals = createAsyncThunk("deals/fetch", async () => {
  return await apiRequest("/deals");
});

export const addDeal = createAsyncThunk(
  "deals/add",
  async ({ customer_id, product_id, title, value }) => {
    return await apiRequest("/deals", {
      method: "POST",
      body: JSON.stringify({ customer_id, product_id, title, value }),
    });
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default dealsSlice.reducer;

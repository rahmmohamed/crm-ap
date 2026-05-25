import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../app/api.js";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await apiRequest("/products");
});

export const addProduct = createAsyncThunk(
  "products/add",
  async ({ name, price, stock }) => {
    return await apiRequest("/products", {
      method: "POST",
      body: JSON.stringify({ name, price, stock }),
    });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default productsSlice.reducer;

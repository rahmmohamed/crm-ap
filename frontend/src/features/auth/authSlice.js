import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../app/api.js";

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("crm_token", data.token);
  return { token: data.token };
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, role }) => {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    });
    // store token like login does (API returns { token })
    if (data && data.token) {
      localStorage.setItem("crm_token", data.token);
      return { token: data.token };
    }
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("crm_token"),
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("crm_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // handle register lifecycle similar to login
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload && action.payload.token) {
          state.token = action.payload.token;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

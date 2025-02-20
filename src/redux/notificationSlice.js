// src/redux/notificationSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/api";

export const sendNotification = createAsyncThunk(
  "notifications/sendNotification",
  async ({ senderId, receiverId, message }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/send`, {
        senderId,
        receiverId,
        message,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send notification"
      );
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { notifications: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(sendNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.push(action.payload);
      })
      .addCase(sendNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;

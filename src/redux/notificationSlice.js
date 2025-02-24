// src/redux/notificationSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/api";

// Async thunk to send notification
export const sendNotification = createAsyncThunk(
  "notifications/sendNotification",
  async ({ senderId, receiverId, message, postId }, { rejectWithValue }) => {
    try {
      if (!senderId || !receiverId || !message || !postId) {
        console.error("Required data is missing for notification");
        return rejectWithValue("Required data is missing");
      }

      // API call to send notification
      const response = await axios.post(`${API_URL}/send`, {
        senderId,
        receiverId,
        message,
        postId,
      });

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send notification"
      );
    }
  }
);

// Notification slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState: { notifications: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(sendNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
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

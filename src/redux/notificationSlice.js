// src/redux/notificationSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/api";

// Async thunk to send notification
export const sendNotification = createAsyncThunk(
  "notifications/sendNotification",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get data from Redux state
      const state = getState();
      const currentUser = state.auth.currentUser; // Assuming auth slice holds currentUser
      const post = state.posts.selectedPost; // Assuming posts slice holds selected post
      const postOwner = post.owner; // Extracting post owner from post data

      if (!currentUser || !post || !postOwner) {
        console.error("Required data is missing: currentUser, post, or postOwner");
        return rejectWithValue("Required data is missing");
      }

      // API call to send notification
      const response = await axios.post(`${API_URL}/send`, {
        senderId: currentUser.id, // User showing interest
        receiverId: postOwner.id, // Owner of the post
        message: `${currentUser.name} is interested in your post`,
        postId: post._id, // The post related to the interest
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

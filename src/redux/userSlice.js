import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Async thunk to fetch user profile and posts
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/user-profile'); // Assuming this route is set up in the backend
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// Update User Profile
export const updateUserProfile = createAsyncThunk("user/updateProfile", async ({ name, profilePhoto, location, preferences, skills, interests, experience }, { rejectWithValue }) => {
  try {
    const response = await axios.put("/api/auth/edit-profile", { name, profilePhoto, location, preferences, skills, interests, experience }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true
    });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get Saved Posts
export const fetchSavedPosts = createAsyncThunk("posts/fetchSavedPosts", async (token) => {
  const response = await axios.get(`http://localhost:5000/api/saved`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});
export const removeSavedPost = createAsyncThunk(
  "posts/removeSavedPost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/saved/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return postId; // Return the post ID to filter it out in the reducer
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    posts: [],
    savedposts: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.posts = action.payload.posts;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchSavedPosts.pending, (state) => {
        state.savedStatus = "loading";
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.savedStatus = "succeeded";
        state.savedposts = action.payload; // Ensure backend returns an array of saved posts
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.savedStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(removeSavedPost.fulfilled, (state, action) => {
        if (!state.savedPosts) {
          state.savedPosts = [];
        }
        state.savedPosts = state.savedPosts.filter(post => post._id !== action.payload);
      });

  },
});

export default userSlice.reducer;

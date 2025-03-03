import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Async thunk for fetching profile data
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId, { rejectWithValue }) => {
    if (!userId) return rejectWithValue('Invalid user ID');

    try {
      const { data } = await axios.get(`/api/singleprofile/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue('Failed to load profile');
    }
  }
);


const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {}, // No synchronous reducers for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.posts = action.payload.posts;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;

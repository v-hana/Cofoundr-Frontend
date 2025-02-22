import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchExploreProfiles = createAsyncThunk(
  'explore/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/exploreprofiles', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const exploreProfileSlice = createSlice({
  name: 'exploreProfiles',
  initialState: {
    preferencesProfiles: [],
    skillsProfiles: [],
    locationProfiles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExploreProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExploreProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.preferencesProfiles = action.payload.preferencesProfiles;
        state.skillsProfiles = action.payload.skillsProfiles;
        state.locationProfiles = action.payload.locationProfiles;
      })
      .addCase(fetchExploreProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default exploreProfileSlice.reducer;

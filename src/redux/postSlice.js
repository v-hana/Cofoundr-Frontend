import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Create an async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/home', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // Extracting the error message from response
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);
export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ userId, content, category, image, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('content', content);
      formData.append('category', category);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/add-post', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Return the newly created post from the backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);


const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Now correctly sets API's error message
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new post to the posts array after a successful creation
        state.posts.push(action.payload.post);
        state.successMessage = action.payload.message; // Store success message
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message from API
      });
  },
});

export default postSlice.reducer;

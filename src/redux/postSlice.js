import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
const API_URL = "http://localhost:5000/api";
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
  async ({ content, category, image, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user-profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.user);

      const userId = response.data.user._id; // Get userId from authenticated user

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('content', content);
      formData.append('category', category);
      if (image) {
        formData.append('image', image);
      }

      const postResponse = await axios.post('/api/add-post', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return postResponse.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const savePost = createAsyncThunk("posts/savePost", async ({ postId, token }) => {
  const response = await axios.post(
    `http://localhost:5000/api/save/${postId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return postId;
});

// Remove Saved Post
export const removeSavedPost = createAsyncThunk("posts/removeSavedPost", async ({ postId, token }) => {

  await axios.delete(`http://localhost:5000/api/saved/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return postId;
});



export const sendInterest = createAsyncThunk("posts/sendInterest", async ({ postId, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/interest/${postId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send interest");
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    savedPosts: [],
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
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.savedPosts.push(action.payload);
      })
      .addCase(removeSavedPost.fulfilled, (state, action) => {
        state.savedPosts = state.savedPosts.filter((id) => id !== action.payload);
      })

      .addCase(sendInterest.fulfilled, (state, action) => {
        state.interests.push(action.payload);
      });
  },
});

export default postSlice.reducer;

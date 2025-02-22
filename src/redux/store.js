import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import postReducer from './postSlice'
import userReducer from './userSlice'
import exploreProfilesReducer from './exploreProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    user: userReducer,
    exploreProfiles: exploreProfilesReducer,
  },
});

export default store;

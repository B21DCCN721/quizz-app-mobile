import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dataResultTestReducer from './slices/dataResultTestSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    dataResultTest: dataResultTestReducer,
  },
});

export default store;

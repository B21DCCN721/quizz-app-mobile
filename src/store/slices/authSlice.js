import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
    },
    restoreToken: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
  },
});

export const { loginSuccess, logout, restoreToken } = authSlice.actions;
export default authSlice.reducer;

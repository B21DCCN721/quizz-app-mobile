import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: null,
  token: null,
  user: null,
  isMemoAccount: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token; 
      state.user = action.payload.user; 
      state.isMemoAccount = action.payload.isMemoAccount;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.token = null;
      state.user = null;
      state.isMemoAccount = false;
    },
    restoreToken: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.token = action.payload.token; 
      state.user = action.payload.user;
      state.isMemoAccount = true;
    },
  },
});

export const { loginSuccess, logout, restoreToken } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
    restoreToken: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
  },
});

export const { loginSuccess, logout, restoreToken } = authSlice.actions;
export default authSlice.reducer;

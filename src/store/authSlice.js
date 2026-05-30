import { createSlice } from '@reduxjs/toolkit';

const VALID_USERNAME = 'user123';
const VALID_PASSWORD = 'password123';

const initialState = {
  isAuthenticated: false,
  username: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
    },
    logout: () => initialState,
  },
});

export { VALID_USERNAME, VALID_PASSWORD };
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

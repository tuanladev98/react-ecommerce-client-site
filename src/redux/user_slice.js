import { createSlice } from '@reduxjs/toolkit';

const userSlide = createSlice({
  name: 'user',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    isFetching: false,
    isError: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.isError = false;
      localStorage.clear();
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlide.actions;

export default userSlide.reducer;

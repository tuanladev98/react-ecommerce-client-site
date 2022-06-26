import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    changeCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { changeCartItems } = cartSlice.actions;

export default cartSlice.reducer;

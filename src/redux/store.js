import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user_slice';
import cartReducer from './cart_slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

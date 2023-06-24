import { configureStore } from '@reduxjs/toolkit';
import { ElemSlice } from './ElemSlice';

export const store = configureStore({
  reducer: {
    [ElemSlice.name]: ElemSlice.reducer,
  },
});

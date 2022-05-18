import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../slices/category/categorySlice';
import usersReducer from '../slices/users/usersSlices';

const store = configureStore({
  reducer: {
    users: usersReducer,
    category: categoryReducer,
  },
});

export default store;

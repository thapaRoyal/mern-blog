import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// register action
export const registerUserAction = createAsyncThunk(
  'users/register',
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:8000/api/users/register',
        user,
        config
      );
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

// slices
const usersSlices = createSlice({
  name: 'users',
  initialState: {
    userAuth: 'login',
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });
  },
});

export default usersSlices.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

// register action
export const registerUserAction = createAsyncThunk(
  'users/register',
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // http call
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
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

// login action
export const loginUserAction = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );
      // save user data to local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

// logout action
export const logoutUserAction = createAsyncThunk(
  'user/logout',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      // remove user data from local storage
      localStorage.removeItem('userInfo');
      return true;
    } catch (err) {
      if (!err?.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

// get user from local storage
const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// slices
const usersSlices = createSlice({
  name: 'users',
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    // register
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
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });

    // login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
    });
    // logout
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.error;
      state.serverErr = action?.error?.message;
      state.loading = false;
    });
  },
});

export default usersSlices.reducer;

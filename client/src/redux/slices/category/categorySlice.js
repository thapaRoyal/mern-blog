import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseUrl';

// action
export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (category, { rejectWithValue, getState, dispatch }) => {
    // http call
    try {
      const { data } = await axios.post(`${baseUrl}/api/category`, {
        title: category.title,
      });
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

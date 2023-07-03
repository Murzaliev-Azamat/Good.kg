import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types';
import axiosApi from '../axiosApi';

export const fetchCategories = createAsyncThunk<Category[]>('categories/fetchAll', async () => {
  const categoriesResponse = await axiosApi.get<Category[]>('/categories/?limit=' + 1000);
  return categoriesResponse.data;
});

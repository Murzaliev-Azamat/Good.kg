import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface FilterState {
  filterCategory: string;
  filterSubCategory: string;
}

const initialState: FilterState = {
  filterCategory: '',
  filterSubCategory: '',
};

export const FilterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },
    setSubCategory: (state, action: PayloadAction<string>) => {
      state.filterSubCategory = action.payload;
    },
  },
});

export const filterReducer = FilterSlice.reducer;
export const { setCategory, setSubCategory } = FilterSlice.actions;
export const selectFilterCategory = (state: RootState) => state.filter.filterCategory;
export const selectFilterSubCategory = (state: RootState) => state.filter.filterSubCategory;

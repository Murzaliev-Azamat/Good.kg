import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface FilterState {
  filterCategory: string;
  filterSubCategory: string;
  isBirthday: boolean;
}

const initialState: FilterState = {
  filterCategory: '',
  filterSubCategory: '',
  isBirthday: false,
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
    setIsBirthday: (state, action: PayloadAction<boolean>) => {
      state.isBirthday = action.payload;
    },
  },
});

export const filterReducer = FilterSlice.reducer;
export const { setCategory, setSubCategory, setIsBirthday } = FilterSlice.actions;
export const selectFilterCategory = (state: RootState) => state.filter.filterCategory;
export const selectFilterSubCategory = (state: RootState) => state.filter.filterSubCategory;
export const selectFilterIsBirthday = (state: RootState) => state.filter.isBirthday;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface SearchState {
  search: string;
}

const initialState: SearchState = {
  search: '',
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const searchReducer = SearchSlice.reducer;
export const { setSearch } = SearchSlice.actions;

export const selectSearch = (state: RootState) => state.search.search;

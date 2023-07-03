import { configureStore } from '@reduxjs/toolkit';
import { promotionsReducer } from '../store/promotionsSlice';
import { companiesReducer } from '../store/companiesSlice';
import { categoriesReducer } from '../store/categoriesSlice';
import { filterReducer } from '../store/filterSlice';
import { searchReducer } from '../store/searchSlice';

export const store = configureStore({
  reducer: {
    promotions: promotionsReducer,
    companies: companiesReducer,
    categories: categoriesReducer,
    filter: filterReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

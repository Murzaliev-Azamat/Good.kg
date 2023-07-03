import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterByCategory, Promotion, Search } from '../../types';
import axiosApi from '../axiosApi';

import { RootState } from '../app/store';

export const fetchPromotions = createAsyncThunk<Promotion[], FilterByCategory | undefined, { state: RootState }>(
  'promotions/fetchAll',
  async (category, thunkAPI) => {
    const page = thunkAPI.getState().promotions.pagePromotions;

    const promotionsResponse = await axiosApi.get<Promotion[]>('/promotions/?limit=' + 10 + '&page=' + page);
    return promotionsResponse.data;
  },
);

export const fetchPromotionsByCategory = createAsyncThunk<
  Promotion[] | [],
  FilterByCategory | undefined,
  { state: RootState }
>('promotions/fetchAllByCategory', async (category, thunkAPI) => {
  const pageByCategory = thunkAPI.getState().promotions.pagePromotionsByCategory;
  if (category) {
    const promotionsResponse = await axiosApi.get<Promotion[]>(
      '/promotions/?limit=' + 10 + '&categoryId=' + category.category + '&page=' + pageByCategory,
    );
    return promotionsResponse.data;
  }
  return [];
});

export const fetchPromotionsBySearch = createAsyncThunk<Promotion[] | [], Search | undefined, { state: RootState }>(
  'promotions/fetchAllBySearch',
  async (search, thunkAPI) => {
    const pageBySearch = thunkAPI.getState().promotions.pagePromotionsBySearch;

    if (search) {
      const promotionsResponse = await axiosApi.get<Promotion[]>(
        '/promotions/?limit=' + 10 + '&search=' + search.search + '&page=' + pageBySearch,
      );
      return promotionsResponse.data;
    }
    return [];
  },
);

// export const fetchPromotion = createAsyncThunk<Promotion, string>(
//   'promotions/fetchOne',
//   async (id) => {
//     const promotionResponse = await axiosApi.get<Promotion | null>('promotions/' + id);
//     const promotion = promotionResponse.data;
//
//     if (promotion === null) {
//       throw new Error('Not found!')
//     }
//
//     return promotion;
//   },
// );

// export const addOneNews = createAsyncThunk<void, OneNewsApi>(
//   'news/add',
//   async (oneNews) => {
//     const formData = new FormData();
//
//     const keys = Object.keys(oneNews) as (keyof OneNewsApi)[];
//     keys.forEach(key => {
//       const value = oneNews[key];
//
//       if (value !== null) {
//         formData.append(key, value);
//       }
//     });
//
//     await axiosApi.post<OneNewsApi>('/news', formData);
//   }
// );

// export const deleteOneNews = createAsyncThunk<void, string>(
//   'news/deleteOne',
//   async (id) => {
//     await axiosApi.delete('/news/' + id);
//   }
// );

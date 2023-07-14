import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterByCategory, Promotion, PromotionApi, Search } from '../../types';
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
      '/promotions/category/?limit=' + 10 + '&categoryId=' + category.category + '&page=' + pageByCategory,
    );
    return promotionsResponse.data;
  }
  return [];
});

export const fetchPromotionsBySearch = createAsyncThunk<Promotion[] | [], Search | undefined, { state: RootState }>(
  'promotions/fetchPromotionsBySearch',
  async (search, thunkAPI) => {
    const pageBySearch = thunkAPI.getState().promotions.pagePromotionsBySearch;

    if (search) {
      const promotionsResponse = await axiosApi.get<Promotion[]>(
        '/promotions/search/?limit=' + 10 + '&search=' + search.search + '&page=' + pageBySearch,
      );
      return promotionsResponse.data;
    }
    return [];
  },
);

export const fetchPromotionsByCompanyId = createAsyncThunk<Promotion[] | [], string>(
  'promotions/fetchAllByCompanyId',
  async (id) => {
    if (id) {
      const promotionsResponse = await axiosApi.get<Promotion[]>('promotions/companyId/' + id);
      return promotionsResponse.data;
    }
    return [];
  },
);

// export const reloadCurrentPage = createAsyncThunk<Promotion[], void, { state: RootState }>(
//   'promotions/reloadCurrentPage',
//   async (currentPage, thunkAPI) => {
//     const page = thunkAPI.getState().promotions.pagePromotions;
//
//     const promotionsResponse = await axiosApi.get<Promotion[]>('/promotions/?limit=' + 10 + '&page=' + (page - 1));
//     return promotionsResponse.data;
//   },
// );

export const fetchPromotionById = createAsyncThunk<Promotion, string>('promotions/fetchOne', async (id) => {
  const promotionResponse = await axiosApi.get<Promotion | null>('promotions/' + id);
  const promotion = promotionResponse.data;

  if (promotion === null) {
    throw new Error('Not found!');
  }

  return promotion;
});

export const addPromotion = createAsyncThunk<void, PromotionApi>('promotions/addPromotion', async (promotion) => {
  const formData = new FormData();

  formData.append('title', promotion.title);
  formData.append('company', promotion.company);
  formData.append('description', promotion.description);
  formData.append('isAlways', promotion.isAlways);
  formData.append('isBirthday', promotion.isBirthday.toString());

  if (promotion.startDate) {
    formData.append('startDate', promotion.startDate);
  }

  if (promotion.endDate) {
    formData.append('endDate', promotion.endDate);
  }

  if (promotion.image) {
    formData.append('image', promotion.image);
  }

  await axiosApi.post<PromotionApi>('/promotions', formData);
});

export const deletePromotion = createAsyncThunk<void, string>('promotions/deletePromotion', async (id) => {
  await axiosApi.delete('/promotions/' + id);
});

export const likePromotion = createAsyncThunk<void, string>('promotions/likePromotion', async (id) => {
  await axiosApi.patch('/promotions/' + id + '/toggleLike');
});

// export const deleteOneNews = createAsyncThunk<void, string>(
//   'news/deleteOne',
//   async (id) => {
//     await axiosApi.delete('/news/' + id);
//   }
// );

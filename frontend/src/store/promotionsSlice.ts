import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPromotions,
  fetchPromotionsByCategory,
  fetchPromotionsByCompanyId,
  fetchPromotionsBySearch,
} from './promotionsThunks';
import { Promotion } from '../../types';
import { RootState } from '../app/store';

interface PromotionsState {
  promotions: Promotion[] | [];
  // promotion: Promotion | null;
  fetchAllLoading: boolean;
  // addLoading: boolean;
  pagePromotions: number;
  pagePromotionsByCategory: number;
  pagePromotionsBySearch: number;
  hasMorePromotion: boolean;
}

const initialState: PromotionsState = {
  promotions: [],
  // promotion: null,
  fetchAllLoading: false,
  // addLoading: false,
  pagePromotions: 1,
  pagePromotionsByCategory: 1,
  pagePromotionsBySearch: 1,
  hasMorePromotion: true,
};

export const PromotionsSlice = createSlice({
  name: 'promotions',
  initialState: initialState,
  reducers: {
    clearAllPromotions: (state) => {
      state.promotions = [];
      state.pagePromotions = 1;
      state.pagePromotionsByCategory = 1;
      state.pagePromotionsBySearch = 1;
      state.hasMorePromotion = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPromotions.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchPromotions.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      if (action.payload.length === 0) {
        state.hasMorePromotion = false;
      }
      Array.prototype.push.apply(state.promotions, action.payload);
      state.pagePromotions++;
    });
    builder.addCase(fetchPromotions.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchPromotionsByCategory.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchPromotionsByCategory.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      Array.prototype.push.apply(state.promotions, action.payload);
      state.pagePromotionsByCategory++;
      if (action.payload.length === 0) {
        state.hasMorePromotion = false;
      }
    });
    builder.addCase(fetchPromotionsByCategory.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchPromotionsBySearch.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchPromotionsBySearch.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      Array.prototype.push.apply(state.promotions, action.payload);
      state.pagePromotionsBySearch++;
      if (action.payload.length === 0) {
        state.hasMorePromotion = false;
      }
    });
    builder.addCase(fetchPromotionsBySearch.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchPromotionsByCompanyId.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchPromotionsByCompanyId.fulfilled, (state, action) => {
      state.fetchAllLoading = false;
      state.promotions = action.payload;
    });
    builder.addCase(fetchPromotionsByCompanyId.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    // builder.addCase(fetchPromotion.pending, (state) => {
    //   state.fetchAllLoading = true;
    // });
    // builder.addCase(fetchPromotion.fulfilled, (state, action) => {
    //   state.fetchAllLoading = false;
    //   state.promotion = action.payload;
    // });
    // builder.addCase(fetchPromotion.rejected, (state) => {
    //   state.fetchAllLoading = false;
    // });
    // builder.addCase(addOneNews.pending, (state) => {
    //   state.addLoading = true;
    // });
    // builder.addCase(addOneNews.fulfilled, (state) => {
    //   state.addLoading = false;
    // });
    // builder.addCase(addOneNews.rejected, (state) => {
    //   state.addLoading = false;
    // });
  },
});

export const promotionsReducer = PromotionsSlice.reducer;
export const selectPromotions = (state: RootState) => state.promotions.promotions;
// export const selectPromotion = (state: RootState) => state.promotions.promotion;
export const selectPagePromotions = (state: RootState) => state.promotions.pagePromotions;
export const selectHasMorePromotion = (state: RootState) => state.promotions.hasMorePromotion;

export const { clearAllPromotions } = PromotionsSlice.actions;

// export const selectHasMore = (state: RootState) => state.promotions.hasMore;
// export const selectFetchData = (state: RootState) => state.promotions.fetchData;

export const selectFetchAllLoading = (state: RootState) => state.promotions.fetchAllLoading;

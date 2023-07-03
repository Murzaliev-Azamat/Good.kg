import { createAsyncThunk } from '@reduxjs/toolkit';
import { Company, FilterByCategory, Search } from '../../types';
import axiosApi from '../axiosApi';

import { RootState } from '../app/store';

export const fetchCompanies = createAsyncThunk<Company[], FilterByCategory | undefined, { state: RootState }>(
  'companies/fetchAll',
  async (category, thunkAPI) => {
    const page = thunkAPI.getState().companies.pageCompanies;

    const companiesResponse = await axiosApi.get<Company[]>('/companies/?limit=' + 10 + '&page=' + page);
    return companiesResponse.data;
  },
);

export const fetchCompaniesByCategory = createAsyncThunk<
  Company[] | [],
  FilterByCategory | undefined,
  { state: RootState }
>('companies/fetchAllByCategory', async (category, thunkAPI) => {
  const pageByCategory = thunkAPI.getState().companies.pageCompaniesByCategory;
  if (category) {
    const companiesResponse = await axiosApi.get<Company[]>(
      '/companies/?limit=' + 10 + '&categoryId=' + category.category + '&page=' + pageByCategory,
    );
    return companiesResponse.data;
  }
  return [];
});

export const fetchCompaniesBySearch = createAsyncThunk<Company[] | [], Search | undefined, { state: RootState }>(
  'companies/fetchAllBySearch',
  async (search, thunkAPI) => {
    const pageBySearch = thunkAPI.getState().companies.pageCompaniesBySearch;

    if (search) {
      const companiesResponse = await axiosApi.get<Company[]>(
        '/companies/?limit=' + 10 + '&search=' + search.search + '&page=' + pageBySearch,
      );
      return companiesResponse.data;
    }
    return [];
  },
);

// export const fetchCompany = createAsyncThunk<Company, string>(
//   'companies/fetchOne',
//   async (id) => {
//     const companyResponse = await axiosApi.get<Company | null>('companies/' + id);
//     const company = companyResponse.data;
//
//     if (company === null) {
//       throw new Error('Not found!')
//     }
//
//     return company;
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

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { promotionsReducer } from '../store/promotionsSlice';
import { companiesReducer } from '../store/companiesSlice';
import { categoriesReducer } from '../store/categoriesSlice';
import { filterReducer } from '../store/filterSlice';
import { searchReducer } from '../store/searchSlice';
import { usersReducer } from '../containers/users/usersSlise';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

const usersPersistConfig = {
  key: 'shop:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  promotions: promotionsReducer,
  companies: companiesReducer,
  categories: categoriesReducer,
  filter: filterReducer,
  search: searchReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     promotions: promotionsReducer,
//     companies: companiesReducer,
//     categories: categoriesReducer,
//     filter: filterReducer,
//     search: searchReducer,
//   },
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

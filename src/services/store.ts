import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredientsSlice';
import authSlice from './slices/authSlice';
import orderSlice from './slices/orderSlice';
import userOrdersSlice from './slices/userOrdersSlice';
import feedsSlice from './slices/feedsSlice';
import constructorSlice from './slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: constructorSlice,
  auth: authSlice,
  order: orderSlice,
  userOrders: userOrdersSlice,
  feeds: feedsSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

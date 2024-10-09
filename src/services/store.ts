import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import feedsReducer from './slices/feedSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Комбинируем все редьюсеры
const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feeds: feedsReducer
});

// Создаём store, используя rootReducer
const store = configureStore({
  reducer: rootReducer, // Используем rootReducer здесь
  devTools: process.env.NODE_ENV !== 'production' // Включаем devTools только в dev-среде
});

export type RootState = ReturnType<typeof store.getState>; // Экспортируем тип состояния
export type AppDispatch = typeof store.dispatch; // Экспортируем тип dispatch
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

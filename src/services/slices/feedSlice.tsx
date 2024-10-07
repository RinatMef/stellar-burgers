import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { getFeedsApi } from '@api';

import { RootState } from '../store';

interface IFeedState {
  success: boolean;
  orders: TOrder[];
  name: string | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
}

const initialState: IFeedState = {
  success: false,
  orders: [],
  name: null,
  isLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk(
  'feed/getFeeds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();

      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении заказов.');
    }
  }
);

const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload as string;

        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export default feedsSlice.reducer;

export const selectFeedsState = (state: RootState) => state.feeds;

export const selectFeed = createSelector(
  selectFeedsState,
  (state) => state.orders
);

// Селектор для получения общего числа заказов
export const selectTotalOrders = createSelector(
  selectFeedsState,
  (state) => state.total
);

// Селектор для получения общего числа заказов за сегодня
export const selectTotalTodayOrders = createSelector(
  selectFeedsState,
  (state) => state.totalToday
);

// Селектор для получения статуса загрузки
export const selectIsLoading = createSelector(
  selectFeedsState,
  (state) => state.isLoading
);

// Селектор для получения ошибки (если она есть)
export const selectError = createSelector(
  selectFeedsState,
  (state) => state.error
);

// Селектор для получения статуса успеха
export const selectSuccess = createSelector(
  selectFeedsState,
  (state) => state.success
);

// Пример дополнительного селектора для получения конкретного заказа по ID
export const selectOrderById = (orderId: string) =>
  createSelector(selectFeedsState, (state) =>
    state.orders ? state.orders.find((order) => order._id === orderId) : null
  );

import {
  createSlice,
  createSelector,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse,
  getOrderByNumberApi
} from '@api';

import { RootState } from '../store';

interface IOrderState {
  success: boolean;
  order: TOrder | null;
  userOrder: TOrder[] | null;
  name: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  success: false,
  order: null,
  userOrder: null,
  name: null,
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export const postOrders = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/postOrders',
  async (data: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(data);

      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при отправке заказа.');
    }
  }
);

export const getOrderByNum = createAsyncThunk(
  'order/fetchOrderByNum',
  async (orderNum: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(orderNum);
      const order = response.orders.find((order) => order.number === orderNum);
      if (!order) {
        return rejectWithValue('Ордер не найден');
      }

      return order;
    } catch (error) {
      console.error('Ошибка при получении заказов:', error);
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.order = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNum.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNum.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload as string;

        state.isLoading = false;
      })
      .addCase(getOrderByNum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload;
      })
      .addCase(postOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrders.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload as string;

        state.isLoading = false;
      })
      .addCase(postOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.order = action.payload.order;
        state.name = action.payload.name;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload as string;

        state.isLoading = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.userOrder = action.payload;
      });
  }
});

export default orderSlice.reducer;
export const selectOrderSlice = (state: RootState) => state.order;

export const orderSelect = createSelector(
  selectOrderSlice,
  (state) => state.order
);

export const ordersProfile = createSelector(
  selectOrderSlice,
  (orderState) => orderState.userOrder ?? []
);

export const { clearOrderModal } = orderSlice.actions;

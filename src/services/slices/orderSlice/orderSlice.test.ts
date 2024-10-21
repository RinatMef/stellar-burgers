import reducer, {
  fetchOrders,
  postOrders,
  getOrderByNum,
  clearOrderModal
} from './orderSlice';
import { expect, test, describe, jest } from '@jest/globals';
import {
  mockedOrderDetails,
  mockedOrderResponse,
  mockedProfileOrders,
  mockedError,
  initialState
} from './mocks';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(initialState)
    }) as any
);

describe('order reducer and async actions', function () {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should return the initial state', function () {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('should handle clearOrderModal', function () {
    const currentState = {
      success: true,
      order: mockedOrderDetails.orders[0],
      userOrder: null,
      name: 'Краторный бессмертный фалленианский метеоритный бургер',
      isLoading: false,
      error: null
    };

    const newState = reducer(currentState, clearOrderModal());
    expect(newState).toEqual(initialState);
  });

  describe('Test async thunk for getOrderByNum', function () {
    test('should handle getOrderByNum.pending', function () {
      const action = { type: getOrderByNum.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });
    test('should handle getOrderByNum.fulfilled', function () {
      const action = {
        type: getOrderByNum.fulfilled.type,
        payload: mockedOrderDetails.orders[0]
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockedOrderDetails.orders[0]);
    });

    test('should handle getOrderByNum.rejected', function () {
      const action = {
        type: getOrderByNum.rejected.type,
        payload: mockedError
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(mockedError);
    });
  });

  describe('Test async thunk for postOrders', function () {
    test('should handle postOrders.pending', function () {
      const action = { type: postOrders.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });
    test('should handle postOrders.fulfilled', function () {
      const action = {
        type: postOrders.fulfilled.type,
        payload: mockedOrderResponse
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.order).toEqual(mockedOrderResponse.order);
      expect(state.name).toEqual(mockedOrderResponse.name);
    });

    test('should handle postOrders.rejected', function () {
      const action = { type: postOrders.rejected.type, payload: mockedError };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockedError);
    });
  });

  describe('Test async thunk for fetchOrders', function () {
    test('should handle postOrders.pending', function () {
      const action = { type: fetchOrders.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });
    test('should handle fetchOrders.fulfilled', function () {
      const action = {
        type: fetchOrders.fulfilled.type,
        payload: mockedProfileOrders
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.userOrder).toEqual(mockedProfileOrders);
    });

    test('should handle fetchOrders.rejected', function () {
      const action = { type: fetchOrders.rejected.type, payload: mockedError };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockedError);
      expect(state.success).toBe(false);
    });
  });
});

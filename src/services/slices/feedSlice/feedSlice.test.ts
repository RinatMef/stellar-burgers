import reducer, { fetchFeeds } from './feedSlice';
import { expect, test, describe, jest } from '@jest/globals';
import { initialState, mockedError, mockedFeeds } from './mocks';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(mockedFeeds)
    }) as any
);

describe('Feeds reducer async actions', function () {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should handle fetchFeeds.pending', function () {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('should handle fetchFeeds.fulfilled', function () {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockedFeeds };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockedFeeds.orders);
    expect(state.success).toEqual(mockedFeeds.success);
    expect(state.total).toEqual(mockedFeeds.total);
    expect(state.totalToday).toEqual(mockedFeeds.totalToday);
  });

  test('should handle fetchFeeds.rejected', function () {
    const action = { type: fetchFeeds.rejected.type, payload: mockedError };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedError);
  });
});

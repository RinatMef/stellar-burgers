import reducer, {
  getIngredients,
  setSelectedIngredient,
  clearSelectedIngredient
} from './ingredientsSlice';
import { expect, test, describe, jest } from '@jest/globals';
import {
  initialState,
  mockedError,
  mockIngredientsState,
  mockIngredientsWithSelected,
  mockSelectedIngredient
} from './mocks';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(mockIngredientsState)
    }) as any
);

describe('ingredients reducer and async actions', function () {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should return the initial state', function () {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('should handle setSelectedIngredient', function () {
    const newState = reducer(
      mockIngredientsState,
      setSelectedIngredient(mockSelectedIngredient)
    );
    expect(newState).toEqual(mockIngredientsWithSelected);
  });

  test('should handle clearSelectedIngredient', function () {
    const newState = reducer(
      mockIngredientsWithSelected,
      clearSelectedIngredient()
    );
    expect(newState).toEqual(mockIngredientsState);
  });

  test('should handle getIngredients.pending', function () {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.status).toEqual('loading');
    expect(state.error).toBe(null);
  });

  test('should handle getIngredients.fulfilled', function () {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredientsState.items
    };
    const state = reducer(initialState, action);
    expect(state.status).toEqual('succeeded');
    expect(state.items).toEqual(mockIngredientsState.items);
  });

  test('should handle getIngredients.rejected', function () {
    const action = { type: getIngredients.rejected.type, payload: mockedError };
    const state = reducer(initialState, action);
    expect(state.status).toEqual('failed');
    expect(state.error).toEqual(mockedError);
  });
});

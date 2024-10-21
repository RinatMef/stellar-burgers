import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';
import ingredientsReducer from './slices/ingredientsSlice/ingredientsSlice';
import burgerConstructorReducer from './slices/constructorSlise/ConstructorSlice';
import userReducer from './slices/userSlice/userSlice';
import orderReducer from './slices/orderSlice/orderSlice';
import feedsReducer from './slices/feedSlice/feedSlice';

describe('rootReducer', function () {
  test('should return initial state', function () {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const expectedState = {
      ingredients: ingredientsReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      burgerConstructor: burgerConstructorReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      feeds: feedsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      order: orderReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      user: userReducer(undefined, { type: 'UNKNOWN_ACTION' })
    };
    expect(initialState).toEqual(expectedState);
  });
});

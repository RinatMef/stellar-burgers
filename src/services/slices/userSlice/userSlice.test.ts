import reducer, {
  setUser,
  checkAuth,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  checkUserAuth
} from './userSlice';
import { expect, test, describe, jest } from '@jest/globals';
import {
  initialState,
  mockAuthResponse,
  mockLoginError,
  mockRegisterError,
  mockUpdateUserError,
  mockUser,
  mockUserResponce
} from './mocks';
import { setCookie } from '../../../utils/cookie';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(initialState)
    }) as any
);

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

describe('test userSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn((key: string) => null),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn((index: number) => null)
    };
  });
  test('should handle setUser', function () {
    const newState = reducer(initialState, setUser(mockUser));
    expect(newState.user).toEqual(mockUser);
  });

  test('should handle checkAuth', function () {
    const currentState = { ...initialState, isCheckAuth: false };
    const newState = reducer(currentState, checkAuth(true));
    expect(newState.isCheckAuth).toBe(true);
  });

  describe('test registerUser', function () {
    test('should handle registerUser.pending', function () {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });
    test('should handle registerUser.rejected', function () {
      const action = {
        type: registerUser.rejected.type,
        payload: mockRegisterError
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockRegisterError);
      expect(state.isCheckAuth).toBe(false);
      expect(state.success).toBe(false);
    });
    test('should handle registerUser.fulfilled', function () {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockAuthResponse
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refreshToken',
        mockAuthResponse.refreshToken
      );
      expect(setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockAuthResponse.accessToken
      );
    });
  });

  describe('test loginUser', function () {
    test('should handle loginUser.pending', function () {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('should handle loginUser.rejected', function () {
      const action = { type: loginUser.rejected.type, payload: mockLoginError };
      const state = reducer(initialState, action);
      expect(state.isLoading).toEqual(false);
      expect(state.error).toEqual(mockLoginError);
      expect(state.success).toBe(false);
    });

    test('should handle loginUser.fulfilled', function () {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUserResponce
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toEqual(mockUserResponce.success);
      expect(state.user).toEqual(mockUserResponce.user);
    });
  });

  describe('test updateUser', function () {
    test('should handle updateUser.pending', function () {
      const action = { type: updateUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.success).toBe(false);
      expect(state.error).toBe(null);
    });

    test('should handle updateUser.rejected', function () {
      const action = {
        type: updateUser.rejected.type,
        payload: mockUpdateUserError
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(mockUpdateUserError);
      expect(state.success).toBe(false);
    });

    test('should handle updateUser.fulfilled', function () {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUserResponce
      };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toEqual(mockUserResponce.success);
      expect(state.user).toEqual(mockUserResponce.user);
    });
  });
  test('should handle checkUserAuth.fulfilled', function () {
    const action = {
      type: checkUserAuth.fulfilled.type,
      payload: mockAuthResponse
    };
    const state = reducer(initialState, action);
    expect(state.success).toEqual(mockAuthResponse.success);
  });
  test('should handle logoutUser.fulfilled', function () {
    const action = { type: logoutUser.fulfilled.type };
    const state = reducer(initialState, action);
    expect(state.user).toBe(null);
  });
});

import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  refreshToken,
  fetchWithRefresh,
  registerUserApi,
  resetPasswordApi,
  loginUserApi,
  forgotPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { RootState } from '../../store';
import { stat } from 'fs';

interface IUserState {
  success: boolean;
  isCheckAuth: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  success: false,
  isCheckAuth: false,
  user: null,
  isLoading: false,
  error: null
};

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((response) => {
          dispatch(setUser(response.user));
          dispatch(checkAuth(true));
        })
        .finally(() => {
          dispatch(checkAuth(true));
        });
    } else {
      dispatch(checkAuth(false));
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(user);
      setCookie('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при получении данных юзера:');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      console.log('Выход из системы выполнен');
      return response;
    } catch (error) {
      console.log('Ошибка выхода', error);
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(user);
      setCookie('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при регистрации пользователя');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(user);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при входе пользователя');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    checkAuth: (state, action) => {
      state.isCheckAuth = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload as string;
        state.isCheckAuth = false;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.success = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.success = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.success = true;
      });
  }
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserName = createSelector(
  [selectUser],
  (user) => user?.name
);
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const { setUser, checkAuth } = userSlice.actions;
export const selectIsCheckAuth = (state: RootState) => state.user.isCheckAuth;

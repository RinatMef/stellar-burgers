import { TUser } from '@utils-types';

interface IUserState {
  success: boolean;
  isCheckAuth: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IUserState = {
  success: false,
  isCheckAuth: false,
  user: null,
  isLoading: false,
  error: null
};

export const mockUser = {
  user: {
    email: 'test@test.te',
    name: 'Шарик Подшипникович'
  }
};

export const mockUserResponce = {
  user: {
    email: 'test@test.te',
    name: 'Шарик Подшипникович'
  },
  success: true
};

export const mockAuthResponse = {
  user: {
    email: 'test@test.te',
    name: 'Шарик Подшипникович'
  },
  success: true,
  refreshToken: 'refreshToken',
  accessToken: 'accessToken'
};

export const mockAuthError = 'Ошибка аутентификации';
export const mockRegisterError = 'Ошибка аутентификации';

export const mockLoginError = 'Ошибка авторизации';
export const mockUpdateUserError = 'Ошибка обновления данных';

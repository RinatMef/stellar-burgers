import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectUser } from '../../services/slices/userSlice';
import { TUser } from '@utils-types';
import { TLoginData, TRegisterData } from '@api';
import { AppDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const loginUserData: TLoginData = {
      email,
      password
    };
    dispatch(loginUser(loginUserData));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

import { Navigate, useLocation } from 'react-router-dom';
import { selectIsCheckAuth, selectUser } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const user = useSelector(selectUser);
  const isCheckAuth = useSelector(selectIsCheckAuth);
  const location = useLocation();
  if (!isCheckAuth) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
};

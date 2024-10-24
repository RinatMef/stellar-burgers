import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useMatch
} from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoutes/protectedRoutes';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userSlice/userSlice';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileMatch = useMatch('profile/orders/:number')?.params.number;
  const feedMatch = useMatch('feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber ? orderNumber.padStart(6, '0') : 'недоступен'}`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderNumber ? orderNumber.padStart(6, '0') : 'недоступен'}`}
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

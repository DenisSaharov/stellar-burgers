import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, ProtectedRoute, Modal } from '@components';
import { OrderInfo, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { getUser } from '../../services/slices/authSlice';
import { getCookie } from '../../utils/cookie';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state?.background;

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  const feedMatch = location.pathname.match(/^\/feed\/(\d+)$/);
  const ingredientMatch = location.pathname.match(
    /^\/ingredients\/([a-f0-9]+)$/
  );
  const profileOrderMatch = location.pathname.match(
    /^\/profile\/orders\/(\d+)$/
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
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
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={null} />
        <Route path='/ingredients/:id' element={null} />
        <Route path='/profile/orders/:number' element={null} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {feedMatch && (
        <Modal title={`Заказ #${feedMatch[1]}`} onClose={handleCloseModal}>
          <OrderInfo />
        </Modal>
      )}
      {ingredientMatch && (
        <Modal title='Детали ингредиента' onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
      {profileOrderMatch && (
        <Modal
          title={`Заказ #${profileOrderMatch[1]}`}
          onClose={handleCloseModal}
        >
          <OrderInfo />
        </Modal>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;

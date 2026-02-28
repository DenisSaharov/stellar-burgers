import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import { selectUserOrders } from '../../services/selectors/userOrdersSelectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const orders: TOrder[] = userOrders || [];

  return <ProfileOrdersUI orders={orders} />;
};

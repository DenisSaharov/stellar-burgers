import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../services/slices/orderSlice';
import {
  selectOrder,
  selectOrderLoading
} from '../../services/selectors/orderSelectors';
import { selectConstructorItems } from '../../services/selectors/constructorSelectors';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderLoading = useSelector(selectOrderLoading);
  const constructorItems = useSelector(selectConstructorItems);

  const orderRequest = orderLoading;

  const orderModalData = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!getCookie('accessToken')) {
      navigate('/login');
      return;
    }
    // Собираем ингредиенты
    const ingredients = [
      ...(constructorItems.bun ? [constructorItems.bun._id] : []),
      ...constructorItems.ingredients.map((item) => item._id),
      ...(constructorItems.bun ? [constructorItems.bun._id] : [])
    ];
    dispatch(createOrder(ingredients))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch(() => undefined);
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

import userOrdersReducer, { fetchUserOrders } from './userOrdersSlice';
import { TOrder } from '../../utils/types';

const userOrdersMock: TOrder[] = [
  {
    _id: 'order_1',
    status: 'done',
    name: 'Тестовый бургер',
    createdAt: '2026-02-28T00:00:00.000Z',
    updatedAt: '2026-02-28T00:00:00.000Z',
    number: 12345,
    ingredients: ['bun_1', 'main_1', 'bun_1']
  }
];

describe('userOrdersSlice reducer', () => {
  it('handles fetchUserOrders pending action', () => {
    const state = userOrdersReducer(
      undefined,
      fetchUserOrders.pending('', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fetchUserOrders success action', () => {
    const state = userOrdersReducer(
      { orders: null, loading: true, error: null },
      fetchUserOrders.fulfilled(userOrdersMock, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(userOrdersMock);
  });

  it('handles fetchUserOrders failed action', () => {
    const error = new Error('User orders request failed');

    const state = userOrdersReducer(
      { orders: null, loading: true, error: null },
      fetchUserOrders.rejected(error, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('User orders request failed');
  });
});

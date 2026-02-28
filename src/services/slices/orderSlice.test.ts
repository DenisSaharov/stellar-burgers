import orderReducer, { clearOrder, createOrder } from './orderSlice';
import { TOrder } from '../../utils/types';

const orderMock: TOrder = {
  _id: 'order_1',
  status: 'done',
  name: 'Тестовый бургер',
  createdAt: '2026-02-28T00:00:00.000Z',
  updatedAt: '2026-02-28T00:00:00.000Z',
  number: 12345,
  ingredients: ['bun_1', 'main_1', 'bun_1']
};

describe('orderSlice reducer', () => {
  it('handles createOrder pending action', () => {
    const state = orderReducer(undefined, createOrder.pending('', []));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles createOrder success action', () => {
    const state = orderReducer(
      { order: null, loading: true, error: null },
      createOrder.fulfilled(orderMock, '', [])
    );

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(orderMock);
  });

  it('handles createOrder failed action', () => {
    const error = new Error('Order request failed');

    const state = orderReducer(
      { order: null, loading: true, error: null },
      createOrder.rejected(error, '', [])
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Order request failed');
  });

  it('handles clearOrder action', () => {
    const state = orderReducer(
      { order: orderMock, loading: false, error: null },
      clearOrder()
    );

    expect(state.order).toBeNull();
  });
});

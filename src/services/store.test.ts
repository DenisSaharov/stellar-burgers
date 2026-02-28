import { rootReducer } from './store';

describe('root reducer initialization', () => {
  it('returns initial state for unknown action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state.auth).toEqual({
      user: null,
      isAuthChecked: false,
      loading: false,
      error: null
    });

    expect(state.order).toEqual({
      order: null,
      loading: false,
      error: null
    });

    expect(state.userOrders).toEqual({
      orders: null,
      loading: false,
      error: null
    });

    expect(state.feeds).toEqual({
      data: null,
      loading: false,
      error: null
    });
  });
});

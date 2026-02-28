import feedsReducer, { fetchFeeds } from './feedsSlice';
import { TOrdersData } from '../../utils/types';

const feedsMock: TOrdersData = {
  orders: [
    {
      _id: 'order_1',
      status: 'done',
      name: 'Тестовый бургер',
      createdAt: '2026-02-28T00:00:00.000Z',
      updatedAt: '2026-02-28T00:00:00.000Z',
      number: 12345,
      ingredients: ['bun_1', 'main_1', 'bun_1']
    }
  ],
  total: 100,
  totalToday: 10
};

describe('feedsSlice reducer', () => {
  it('handles fetchFeeds pending action', () => {
    const state = feedsReducer(undefined, fetchFeeds.pending('', undefined));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles fetchFeeds success action', () => {
    const state = feedsReducer(
      { data: null, loading: true, error: null },
      fetchFeeds.fulfilled(feedsMock, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.data).toEqual(feedsMock);
  });

  it('handles fetchFeeds failed action', () => {
    const error = new Error('Feeds request failed');

    const state = feedsReducer(
      { data: null, loading: true, error: null },
      fetchFeeds.rejected(error, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Feeds request failed');
  });
});

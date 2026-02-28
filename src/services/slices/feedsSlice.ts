import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrdersData } from '../../utils/types';

type TFeedsState = {
  data: TOrdersData | null;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  data: null,
  loading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feeds/fetchFeeds',
  async () => getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      });
  }
});

export default feedsSlice.reducer;

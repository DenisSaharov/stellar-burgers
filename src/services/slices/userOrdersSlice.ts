import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TUserOrdersState = {
  orders: TOrder[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: null,
  loading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk<TOrder[]>(
  'userOrders/fetchUserOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user orders';
      });
  }
});

export default userOrdersSlice.reducer;

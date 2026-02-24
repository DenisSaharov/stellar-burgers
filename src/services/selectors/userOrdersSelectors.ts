import { RootState } from '../store';

export const selectUserOrders = (state: RootState) => state.userOrders.orders;
export const selectUserOrdersLoading = (state: RootState) =>
  state.userOrders.loading;
export const selectUserOrdersError = (state: RootState) =>
  state.userOrders.error;

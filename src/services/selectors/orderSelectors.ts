import { RootState } from '../store';

export const selectOrder = (state: RootState) => state.order.order;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;

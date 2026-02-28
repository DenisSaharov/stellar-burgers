import { RootState } from '../store';

export const selectFeedsData = (state: RootState) => state.feeds.data;
export const selectFeedsLoading = (state: RootState) => state.feeds.loading;
export const selectFeedsError = (state: RootState) => state.feeds.error;

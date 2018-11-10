import { some } from 'lodash/fp';

export const selectIsLoading = (state, label) => state.network[label];
export const selectIsAnyLoading = state =>
  some(label => selectIsLoading(state, label), Object.keys(state.network));

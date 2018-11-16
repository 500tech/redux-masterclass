import { some } from 'lodash/fp';
import { createSelectorHook } from 'hooks/redux.hooks';

export const selectIsLoading = (state, label) => state.network[label];
export const selectIsAnyLoading = state =>
  some(label => selectIsLoading(state, label), Object.keys(state.network));

export const useIsLoadingSelector = createSelectorHook(selectIsLoading);
export const useIsAnyLoadingSelector = createSelectorHook(selectIsAnyLoading);

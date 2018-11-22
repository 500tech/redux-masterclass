import { some } from 'lodash/fp';
import { createSelectorHook } from 'hooks/redux.hooks';

const selectIsLoading = (state, label) => state.network[label];
const selectIsAnyLoading = state =>
  some(label => selectIsLoading(state, label), Object.keys(state.network));

export const useIsLoadingSelector = createSelectorHook(selectIsLoading);
export const useIsAnyLoadingSelector = createSelectorHook(selectIsAnyLoading);

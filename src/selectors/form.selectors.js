import { createSelectorHook } from 'hooks/redux.hooks';
import { get } from 'lodash/fp';

const selectFormValue = (state, path) => get(path, state.form);
export const useFormValueSelector = createSelectorHook(selectFormValue);

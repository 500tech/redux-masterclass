import { useActions } from 'hooks/redux.hooks';
import { useFormValueSelector } from 'selectors/form.selectors';
import * as formActions from 'actions/form.actions';

export const useFormField = path => {
  const value = useFormValueSelector(path);
  const [setValue] = useActions(formActions.setValue);

  return {
    value,
    onInput: e => setValue(path, e.target.value)
  };
};

// @flow
import { handleActions } from 'redux-actions';
import { SET_VALUE } from 'actions/form.actions';
import { set } from 'lodash/fp';

const initialState = {};
export default handleActions(
  {
    [SET_VALUE]: (state, action) =>
      set(action.payload.path, action.payload.value, state)
  },
  initialState
);

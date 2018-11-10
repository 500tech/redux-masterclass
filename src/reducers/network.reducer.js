import { handleActions } from 'redux-actions';
import { update } from 'lodash/fp';
import { START_LOADING, END_LOADING } from 'actions/network.actions';

const initialState = {};

const networkReducer = handleActions(
  {
    [START_LOADING]: (state, action) => {
      return update(action.payload, val => (val ? val + 1 : 1), state);
    },
    [END_LOADING]: (state, action) => {
      return update(action.payload, val => (val ? val - 1 : 0), state);
    }
  },
  initialState
);

export default networkReducer;

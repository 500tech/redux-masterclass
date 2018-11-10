import { handleActions } from 'redux-actions';
import { set } from 'lodash/fp';
import { SET_IS_CART_OPEN, SET_FILTER } from 'actions/ui.actions';

const initialState = {
  isCartOpen: false,
  filter: ''
};

const uiReducer = handleActions(
  {
    [SET_IS_CART_OPEN]: (state, action) => {
      return set('isCartOpen', action.payload, state);
    },
    [SET_FILTER]: (state, action) => {
      return set('filter', action.payload, state);
    }
  },
  initialState
);

export default uiReducer;

// products.reducer.js
import { handleActions } from 'redux-actions';
import { set, keyBy } from 'lodash/fp';
import { SET_PRODUCTS } from 'actions/products.actions';

const initialState = null;

const productsReducer = handleActions(
  {
    [SET_PRODUCTS]: (state, action) => keyBy('id', action.payload)
  },
  initialState
);

export default productsReducer;

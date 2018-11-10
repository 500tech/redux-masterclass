import { handleActions } from 'redux-actions';
import { set, getOr, omit } from 'lodash/fp';
import { ADD_TO_CART, REMOVE_FROM_CART } from 'actions/cart.actions';

const initialState = {};

const uiReducer = handleActions(
  {
    [ADD_TO_CART]: (state, action) => {
      const { productId } = action.payload;
      const quantity = getOr(0, [productId, 'quantity'], state) + 1;

      return set(productId, { productId, quantity }, state);
    },
    [REMOVE_FROM_CART]: (state, action) => {
      const { productId, quantity } = action.payload;
      const newQuantity = getOr(0, [productId, 'quantity'], state) - quantity;

      if (newQuantity <= 0) {
        return omit(productId, state);
      }

      return set(productId, { productId, quantity: newQuantity }, state);
    }
  },
  initialState
);

export default uiReducer;

import { get, values, sumBy, set, flow, size } from 'lodash/fp';
import { createSelector } from 'reselect';

export const selectCartProducts = createSelector(
  get('products'),
  get('cart'),
  (products, cart) =>
    Object.keys(cart).reduce((result, id) => set(id, products[id], result), {})
);

export const selectTotalPrice = createSelector(
  get('products'),
  get('cart'),
  (products, cart) =>
    flow([
      values,
      sumBy(item => products[item.productId].price * item.quantity)
    ])(cart)
);

export const selectTotalCount = state => size(state.cart);

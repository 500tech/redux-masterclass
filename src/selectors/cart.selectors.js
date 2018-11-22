import { get, values, sumBy, set, flow, size } from 'lodash/fp';
import { createSelector } from 'reselect';
import { createSelectorHook } from 'hooks/redux.hooks';

const selectCartProducts = createSelector(
  get('products'),
  get('cart'),
  (products, cart) =>
    Object.keys(cart).reduce((result, id) => set(id, products[id], result), {})
);

const selectTotalPrice = createSelector(
  get('products'),
  get('cart'),
  (products, cart) =>
    flow([
      values,
      sumBy(item => products[item.productId].price * item.quantity)
    ])(cart)
);

const selectTotalCount = state => size(state.cart);

export const useCartProductsSelector = createSelectorHook(selectCartProducts);
export const useTotalPriceSelector = createSelectorHook(selectTotalPrice);
export const useTotalCountSelector = createSelectorHook(selectTotalCount);

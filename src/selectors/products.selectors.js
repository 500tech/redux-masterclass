import { get, values } from 'lodash/fp';
import { createSelector } from 'reselect';
import { createSelectorHook } from 'hooks/redux.hooks';

export const selectFilteredProducts = createSelector(
  get('products'),
  get('ui.filter'),
  (products, filter) =>
    products
      ? values(products).filter(product =>
          product.title.toLowerCase().includes(filter.toLowerCase())
        )
      : null
);

export const useFilteredProductsSelector = createSelectorHook(
  selectFilteredProducts
);
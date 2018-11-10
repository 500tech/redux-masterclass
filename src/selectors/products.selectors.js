import { get, values } from 'lodash/fp';
import { createSelector } from 'reselect';

export const selectFilteredProducts = createSelector(
  get('products'),
  get('ui.filter'),
  (products, filter) =>
    values(products).filter(product =>
      product.title.toLowerCase().includes(filter.toLowerCase())
    )
);

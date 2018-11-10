export const SET_IS_CART_OPEN = '[UI] Set isCartOpen';
export const SET_FILTER = '[UI] Set filter';

export const setIsCartOpen = value => ({
  type: SET_IS_CART_OPEN,
  payload: value
});

export const setFilter = value => ({
  type: SET_FILTER,
  payload: value
});

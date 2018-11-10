export const ADD_TO_CART = '[CART] Add to Cart';
export const REMOVE_FROM_CART = '[CART] Remove from Cart';

export const addToCart = productId => ({
  type: ADD_TO_CART,
  payload: {
    productId
  }
});

export const removeFromCart = (productId, quantity) => ({
  type: REMOVE_FROM_CART,
  payload: {
    productId,
    quantity
  }
});

import React, { Component } from 'react';
import { values } from 'lodash/fp';
import {
  useCartProductsSelector,
  useTotalPriceSelector
} from 'selectors/cart.selectors';
import { useSelector, useActions } from 'hooks/redux.hooks';
import * as cartActions from 'actions/cart.actions';

const ShoppingCart = ({ isCartOpen, toggleCart }) => {
  const cart = useSelector('cart');
  const itemsArray = values(cart);
  const products = useCartProductsSelector();
  const totalPrice = useTotalPriceSelector();

  const [addToCart, removeFromCart] = useActions(
    cartActions.addToCart,
    cartActions.removeFromCart
  );

  const renderItem = item => {
    const product = products[item.productId];
    const totalPrice = item.quantity * product.price;

    return (
      <div className="cart-item" key={item.productId}>
        <div className="flex-row">
          <div
            className="cart-item-image"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className="flex-column">
            <div className="cart-item-title">{product.title}</div>
            <div className="cart-item-price">${totalPrice}</div>
          </div>
        </div>
        <div className="cart-item-quantity">
          <button onClick={() => addToCart(item.productId)}>+</button>
          <span>{item.quantity}</span>
          <button onClick={() => removeFromCart(item.productId, 1)}>-</button>
        </div>
        <button
          className="cart-item-remove"
          onClick={() => removeFromCart(item.productId, item.quantity)}>
          X
        </button>
      </div>
    );
  };

  const renderEmpty = () => (
    <div className="cart-empty">Nothing in your cart. Go shopping</div>
  );

  return (
    <div className={`shopping-cart ${isCartOpen ? 'shopping-cart-open' : ''}`}>
      {itemsArray.length ? itemsArray.map(renderItem) : renderEmpty()}
      <div className="cart-total">Total: ${totalPrice}</div>
    </div>
  );
};

export default ShoppingCart;

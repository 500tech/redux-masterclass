import React, { Component } from 'react';
import { useTotalCountSelector } from 'selectors/cart.selectors';

const ShoppingBag = ({ toggleCart }) => {
  const count = useTotalCountSelector();

  return (
    <div className="shopping-bag" onClick={toggleCart}>
      <img
        src="https://cdn4.iconfinder.com/data/icons/shopping-21/64/shopping-06-512.png"
        alt="cart"
      />
      <span className="shopping-bag-badge">{count}</span>
    </div>
  );
};

export default ShoppingBag;

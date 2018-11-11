import React, { Component, useState, useEffect, useContext } from 'react';
import { get } from 'lodash/fp';
import { ReactReduxContext } from 'react-redux';
import ShoppingBag from 'components/shopping-bag';
import ProductsList from 'components/products-list';
import ShoppingCart from 'components/shopping-cart';
import { filteredItems } from 'constants/mocks.constants';

const Home = () => {
  console.log('render');

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Redux Shopping Cart Example</h1>
        <ShoppingBag toggleCart={toggleCart} />
      </header>
      <div className="main-page">
        <ProductsList filteredItems={filteredItems} />
        <ShoppingCart isCartOpen={isCartOpen} />
      </div>
    </div>
  );
};

export default Home;

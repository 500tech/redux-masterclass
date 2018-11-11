import React, { Component, useState, useEffect, useContext } from 'react';
import { get } from 'lodash/fp';
import { connect } from 'react-redux';
import ShoppingBag from 'components/shopping-bag';
import ProductsList from 'components/products-list';
import ShoppingCart from 'components/shopping-cart';
import { setIsCartOpen } from 'actions/ui.actions';
import { selectIsAnyLoading } from 'selectors/network.selectors';

const Home = ({ isCartOpen, setIsCartOpen, isAnyLoading }) => {
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      {isAnyLoading ? <div className="loading" /> : null}
      <header className="App-header">
        <h1 className="App-title">Redux Shopping Cart Example</h1>
        <ShoppingBag toggleCart={toggleCart} />
      </header>
      <div className="main-page">
        <ProductsList />
        <ShoppingCart isCartOpen={isCartOpen} />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    isCartOpen: state.ui.isCartOpen,
    isAnyLoading: selectIsAnyLoading(state)
  }),
  {
    setIsCartOpen
  }
)(Home);

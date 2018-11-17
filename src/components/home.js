import React, { Component, useState, useEffect, useContext } from 'react';
import { get } from 'lodash/fp';
import { connect } from 'react-redux';
import ShoppingBag from 'components/shopping-bag';
import ProductsList from 'components/products-list';
import ShoppingCart from 'components/shopping-cart';
import * as uiActions from 'actions/ui.actions';
import { useIsAnyLoadingSelector } from 'selectors/network.selectors';
import { useLocation } from 'hooks/location.hooks';
import { useOnMount } from 'hooks/lifecycle.hooks';
import { useSelector, useActions } from 'hooks/redux.hooks';

const Home = () => {
  const [location, getLocation] = useLocation();
  useOnMount(getLocation);
  const isAnyLoading = useIsAnyLoadingSelector();
  const isCartOpen = useSelector('ui.isCartOpen');
  const [setIsCartOpen] = useActions(uiActions.setIsCartOpen);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getMessage = () => {
    if (!location) {
      return null;
    }
    const { loading, error, position } = location;
    if (loading) {
      return 'loading location';
    }
    return error || `${position.coords.latitude}, ${position.coords.longitude}`;
  };

  return (
    <div className="App">
      {getMessage()}
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

export default Home;

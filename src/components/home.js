import React, { Component } from 'react';
import ShoppingBag from 'components/shopping-bag';
import ProductsList from 'components/products-list';
import ShoppingCart from 'components/shopping-cart';
import { filteredItems } from 'constants/mocks.constants';

class Home extends Component {
  state = {
    isCartOpen: false
  };
  toggleCart = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MobX Shopping Cart Example</h1>
          <ShoppingBag toggleCart={this.toggleCart} />
        </header>
        <div className="main-page">
          <ProductsList filteredItems={filteredItems} />
          <ShoppingCart isCartOpen={this.state.isCartOpen} />
        </div>
      </div>
    );
  }
}

export default Home;

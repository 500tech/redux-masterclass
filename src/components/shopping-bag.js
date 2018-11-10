import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTotalCount } from 'selectors/cart.selectors';

class ShoppingBag extends Component {
  handleClick = () => this.props.toggleCart();
  render() {
    return (
      <div className="shopping-bag" onClick={this.handleClick}>
        <img
          src="https://cdn4.iconfinder.com/data/icons/shopping-21/64/shopping-06-512.png"
          alt="cart"
        />
        <span className="shopping-bag-badge">{this.props.count}</span>
      </div>
    );
  }
}

export default connect(state => ({
  count: selectTotalCount(state)
}))(ShoppingBag);

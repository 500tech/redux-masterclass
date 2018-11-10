import React, { Component } from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash/fp';
import { selectCartProducts, selectTotalPrice } from 'selectors/cart.selectors';
import { addToCart, removeFromCart } from 'actions/cart.actions';

class ShoppingCart extends Component {
  toggleCart = () => this.props.toggleCart();

  renderItem = item => {
    const product = this.props.products[item.productId];
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
          <button onClick={() => this.props.addToCart(item.productId)}>
            +
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => this.props.removeFromCart(item.productId, 1)}>
            -
          </button>
        </div>
        <button
          className="cart-item-remove"
          onClick={() =>
            this.props.removeFromCart(item.productId, item.quantity)
          }>
          X
        </button>
      </div>
    );
  };

  renderEmpty = () => (
    <div className="cart-empty">Nothing in your cart. Go shopping</div>
  );

  render() {
    const { isCartOpen } = this.props;
    const { cart, totalPrice } = this.props;
    const itemsArray = values(cart);

    return (
      <div
        className={`shopping-cart ${isCartOpen ? 'shopping-cart-open' : ''}`}>
        {itemsArray.length
          ? itemsArray.map(this.renderItem)
          : this.renderEmpty()}
        <div className="cart-total">Total: ${totalPrice}</div>
      </div>
    );
  }
}

export default connect(
  state => ({
    cart: state.cart,
    products: selectCartProducts(state),
    totalPrice: selectTotalPrice(state)
  }),
  {
    addToCart,
    removeFromCart
  }
)(ShoppingCart);

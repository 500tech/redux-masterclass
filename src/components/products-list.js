import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilter, setIsCartOpen } from 'actions/ui.actions';
import { fetchProducts } from 'actions/products.actions';
import { addToCart } from 'actions/cart.actions';
import { selectFilteredProducts } from 'selectors/products.selectors';
import { selectIsLoading } from 'selectors/network.selectors';

class ProductsList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  changeFilter = el => this.props.setFilter(el.target.value);

  addToCart = productId => {
    this.props.addToCart(productId);
    this.props.setIsCartOpen(true);
  };

  renderProduct = product => {
    return (
      <div className="product" key={product.id}>
        <div className="product-details">
          <h1>{product.title}</h1>
          <img src={product.image} width={200} alt={product.title} />
        </div>
        <button onClick={() => this.addToCart(product.id)}>
          Buy ${product.price}
        </button>
      </div>
    );
  };

  renderDummy = () =>
    new Array(4).fill().map((_, i) => (
      <div className="product" key={i}>
        <div className="product-details">
          <h1>..........</h1>
          <img src="/placeholder.png" width={200} />
        </div>
        <button>...</button>
      </div>
    ));

  render() {
    const { filteredItems } = this.props;

    return (
      <div className="products-list">
        <label>
          Search
          <input value={this.props.filter} onChange={this.changeFilter} />
        </label>
        <span>
          <button onClick={this.props.fetchProducts}>Refresh</button>
        </span>
        <div className="products-list-items">
          {filteredItems.length
            ? filteredItems.map(this.renderProduct)
            : this.renderDummy()}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    filteredItems: selectFilteredProducts(state),
    filter: state.ui.filter,
    isLoading: selectIsLoading(state, 'products')
  }),
  {
    setFilter,
    fetchProducts,
    addToCart,
    setIsCartOpen
  }
)(ProductsList);

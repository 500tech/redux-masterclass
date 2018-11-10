import React, { Component } from 'react';

class ProductsList extends Component {
  changeFilter = el => this.props.setFilter(el.target.value);

  addToCart = productId => {
    this.props.addItem(productId, 1);
    this.props.openCart();
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
    const { filteredItems = [] } = this.props;
    return (
      <div className="products-list">
        <label>
          Search
          <input value={this.props.filter} onChange={this.changeFilter} />
        </label>
        <div className="products-list-items">
          {filteredItems.map(this.renderProduct)}
        </div>
      </div>
    );
  }
}

export default ProductsList;

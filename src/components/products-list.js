import React, { Component } from 'react';
import { get } from 'lodash/fp';
import { useSelector, useActions } from 'hooks/redux.hooks';
import { useOnMount } from 'hooks/lifecycle.hooks';
import { useIsLoadingSelector } from 'selectors/network.selectors';
import * as uiActions from 'actions/ui.actions';
import * as productsActions from 'actions/products.actions';
import * as cartActions from 'actions/cart.actions';
import { useFilteredProductsSelector } from 'selectors/products.selectors';

const ProductsList = () => {
  const filteredItems = useFilteredProductsSelector();
  const filter = useSelector(get('ui.filter'));
  const isLoading = useIsLoadingSelector('products');

  const [addToCart, fetchProducts, setFilter, setIsCartOpen] = useActions(
    cartActions.addToCart,
    productsActions.fetchProducts,
    uiActions.setFilter,
    uiActions.setIsCartOpen
  );

  useOnMount(() => {
    fetchProducts();
  });

  const changeFilter = el => setFilter(el.target.value);

  const onAddToCart = productId => {
    addToCart(productId);
    setIsCartOpen(true);
  };

  const renderProduct = product => {
    return (
      <div className="product" key={product.id}>
        <div className="product-details">
          <h1>{product.title}</h1>
          <img src={product.image} width={200} alt={product.title} />
        </div>
        <button onClick={() => onAddToCart(product.id)}>
          Buy ${product.price}
        </button>
      </div>
    );
  };

  const renderDummy = () =>
    new Array(4).fill().map((_, i) => (
      <div className="product" key={i}>
        <div className="product-details">
          <h1>..........</h1>
          <img src="/placeholder.png" width={200} />
        </div>
        <button>...</button>
      </div>
    ));

  return (
    <div className="products-list">
      <label>
        Search
        <input value={filter} onChange={changeFilter} />
      </label>
      <span>
        <button onClick={fetchProducts}>Refresh</button>
      </span>
      <div className="products-list-items">
        {filteredItems ? filteredItems.map(renderProduct) : renderDummy()}
      </div>
    </div>
  );
};

export default ProductsList;

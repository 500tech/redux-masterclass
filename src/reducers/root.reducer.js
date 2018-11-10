// @flow
import { combineReducers } from 'redux';

// import network from 'reducers/network.reducer';
import localization from 'reducers/localization.reducer';
import ui from 'reducers/ui.reducer';
import network from 'reducers/network.reducer';
import products from 'reducers/products.reducer';
import cart from 'reducers/cart.reducer';

export const reducersMap = {
  localization,
  ui,
  network,
  products,
  cart
};

export default combineReducers(reducersMap);

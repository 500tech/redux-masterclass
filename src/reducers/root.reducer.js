// @flow
import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import localization from 'reducers/localization.reducer';

export const reducersMap = {
  network,
  localization
};

export default combineReducers(reducersMap);

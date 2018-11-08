// @flow
import { combineReducers } from 'redux';

// import network from 'reducers/network.reducer';
import localization from 'reducers/localization.reducer';

export const reducersMap = {
  localization
};

export default combineReducers(reducersMap);

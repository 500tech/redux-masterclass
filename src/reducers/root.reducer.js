// @flow
import { combineReducers } from 'redux';

// import network from 'reducers/network.reducer';
import form from 'reducers/form.reducer';

export const reducersMap = {
  form
};

export default combineReducers(reducersMap);

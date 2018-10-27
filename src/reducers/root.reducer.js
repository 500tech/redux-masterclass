// @flow
import { combineReducers } from 'redux';

import network from 'reducers/network.reducer';
import localization from 'reducers/localization.reducer'; // TODO: remove if no localization
import posts from 'reducers/posts.reducer'; // TODO: remove if no localization

export const reducersMap = {
  network,
  localization, // TODO: remove if no localization
  posts
};

export default combineReducers(reducersMap);

// @flow
import { get, set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

import type { PostsMap } from 'types/posts.types';
import type { SetPostsAction } from 'actions/posts.actions';

import * as AT from 'actions/posts.actions';

export type PostsState = {|
  +data: PostsMap
|};

const initialState: PostsState = {
  data: {}
};

const postsReducer = handleActions(
  {
    [AT.SET_POSTS]: (state: PostsState, action: SetPostsAction): PostsState =>
      set('data', get('payload.posts', action), state)
  },
  initialState
);

export default postsReducer;

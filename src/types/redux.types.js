// @flow
import type { LocalizationState } from 'reducers/localization.reducer';
import type { NetworkState } from 'reducers/network.reducer';
import type { PostsState } from 'reducers/posts.reducer';
import type { NetworkAction } from 'actions/network.actions';
import type { LocalizationAction } from 'actions/localization.actions';
import type { ApiAction } from 'actions/api.actions';
import type { PostsAction } from 'actions/posts.actions';

export type BaseAction<PayloadType = any> = {|
  +type: string,
  +payload: PayloadType
|};

export type BaseActionWithMeta<PayloadType = any, MetaType = any> = {|
  +type: string,
  +payload: PayloadType,
  +meta: MetaType
|};

export type Action =
  | NetworkAction
  | LocalizationAction // TODO: remove if not needed
  | PostsAction
  | ApiAction;

export type State = {
  network: NetworkState,
  localization: LocalizationState, // TODO: remove if no localization
  posts: PostsState
};

export type Dispatch = (action: Action) => any;

export type GetState = () => State;
type Next = (action: Action) => any;

export type Middleware = ({
  getState: GetState,
  dispatch: Dispatch
}) => (next: Next) => (action: Action) => any;

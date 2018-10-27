// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash/fp';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import * as postsActions from 'actions/posts.actions';
import { isLoadingSelector } from 'selectors/network.selectors';

import type { State } from 'types/redux.types';
import type { PostsState } from 'reducers/posts.reducer';
import type { MapStateToProps } from 'react-redux';
import type { PostsMap, Post } from 'types/posts.types';

type ConnectedProps = {
  posts: PostsMap,
  isLoading: boolean,
  fetchPosts: () => void
};

type OwnProps = {};

/* 
* Posts component pulling data from server on mount
*/
export class Posts extends React.PureComponent<ConnectedProps & OwnProps> {
  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchPosts();
  };

  renderPost = (post: Post) => (
    <StyledPost key={post.id}>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </StyledPost>
  );

  renderPosts = () => {
    const { posts } = this.props;

    return <div>{values(posts).map(this.renderPost)}</div>;
  };

  render() {
    const { isLoading } = this.props;

    return (
      <StyledContainer>
        <h1>
          <FormattedMessage id="homepage.title" />
        </h1>
        <h3>
          To get started, search your project for // TODO
          <br />
          This is a Posts component that uses a Posts action + reducer, it
          fetches posts from a remote server and displays them
        </h3>
        <img
          src="https://www.materialui.co/materialIcons/navigation/refresh_grey_192x192.png"
          alt="refresh"
          onClick={this.refresh}
        />
        <h2>Posts from remote server</h2>
        {isLoading ? <div>loading...</div> : this.renderPosts()}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  padding: 50px;
  img {
    cursor: pointer;
    width: 35px;
    float: left;
  }
`;

export const StyledPost = styled.div`
  display: inline-block;
  padding: 15px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5);
  width: 300px;
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px;
`;

const mapStateToProps: MapStateToProps<State, OwnProps, {}> = (
  state: State
) => ({
  posts: state.posts.data,
  isLoading: isLoadingSelector(state, postsActions.POSTS_LABEL)
});

export default connect(mapStateToProps, {
  fetchPosts: postsActions.fetchPosts
})(Posts);

import React, { Component } from "react";

import Context from "../Context";

export default class Post extends Component {
  static contextType = Context;
  render() {
    const { post } = this.props;
    return (
      <li key={post.id}>
        <p>{post.content}</p>
        <button
          onClick={(e) => this.context.toggleUserHasLikedPost(post.id)}
          className={`liked-${post.currentUserHasLiked}`}
        >
          like
        </button>
        <p>{post.votes} likes</p>
      </li>
    );
  }
}

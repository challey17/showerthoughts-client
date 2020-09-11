import React, { Component } from "react";

import Post from "../Post/Post";

import Context from "../Context";

export default class Feed extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="feed">
        <p className="feed-info">
          Community posts expire at 12 AM EST each day. Your posts are archived
          in My Posts.
        </p>
        <ul>
          {this.props.posts.map((post, i) => (
            <Post post={post} key={i} />
          ))}
        </ul>
      </div>
    );
  }
}

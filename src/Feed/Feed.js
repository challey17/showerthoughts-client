import React, { Component } from "react";

import Post from "../Post/Post";

import Context from "../Context";

export default class Feed extends Component {
  static contextType = Context;

  render() {
    return (
      <div className="feed">
        <ul>
          {this.props.posts.map((post) => (
            <Post post={post} />
          ))}
        </ul>
      </div>
    );
  }
}

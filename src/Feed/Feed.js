import React, { Component } from "react";

import Context from "../Context";

export default class Feed extends Component {
  static contextType = Context;
  // replace <li> with post component
  render() {
    return (
      <div className="feed">
        <ul>
          {this.context.todaysPosts.map((post) => (
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
          ))}
        </ul>
      </div>
    );
  }
}

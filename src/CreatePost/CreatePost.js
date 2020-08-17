import React, { Component } from "react";

import Context from "../Context";

export default class CreatePost extends Component {
  static contextType = Context;
  render() {
    return (
      <div className="create-post">
        <form onSubmit={(e) => this.context.createPost(e)}>
          <label>
            <textarea
              value={this.context.newPost.content}
              placeholder="new post"
              aria-label="new post"
              onChange={(e) => this.context.setCreatePost(e)}
            />
          </label>
          <div className="input-container">
            <input type="submit" value="POST" />
            <input type="submit" value="cancel" />
          </div>
        </form>
      </div>
    );
  }
}

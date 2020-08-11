import React, { Component } from "react";

import Context from "../Context";

export default class CreatePost extends Component {
  static contextType = Context;
  render() {
    return (
      <div className="create-post">
        <form onSubmit={(e) => this.context.createPost(e)}>
          <label>
            MyPost:
            <textarea
              value={this.context.newPost.content}
              placeholder="new post"
              aria-label="new post"
              onChange={(e) => this.context.setCreatePost(e)}
            />
          </label>
          <input type="submit" value="submit" />
          <input type="submit" value="cancel" />
        </form>
      </div>
    );
  }
}

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
              placeholder="new post"
              aria-label="new post"
              name="content"
            />
          </label>
          <div className="input-container">
            <input type="submit" value="POST" />
            <input type="reset" value="cancel" />
          </div>
        </form>
      </div>
    );
  }
}

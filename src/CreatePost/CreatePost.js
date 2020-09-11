import React, { Component } from "react";

import Context from "../Context";

export default class CreatePost extends Component {
  static contextType = Context;
  render() {
    return (
      <div className="create-post">
        <p>Share your thoughts</p>
        <form onSubmit={(e) => this.context.createPost(e)}>
          <label aria-label="new post">
            <textarea
              placeholder="Share your thoughts once a day, community posts expire at
              12AM EST"
              aria-label="new post"
              name="content"
            />
          </label>
          <div className="input-container">
            <input type="submit" value="POST" />
            <input type="reset" value="RESET" />
          </div>
        </form>
      </div>
    );
  }
}

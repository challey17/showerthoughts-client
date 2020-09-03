import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Context from "../Context";

export default class Post extends Component {
  static contextType = Context;

  render() {
    const { post } = this.props;
    const votes = post.voters.split("").map(Number).length;
    //
    return (
      <li key={post.id}>
        <p>{post.content}</p>
        <button
          onClick={(e) => this.context.toggleUserHasLikedPost(post.id)}
          className={`liked-${post.currentUserHasLiked}`}
        >
          <FontAwesomeIcon icon={faLightbulb} size="2x" />
        </button>
        <p>{votes} likes</p>
      </li>
    );
  }
}

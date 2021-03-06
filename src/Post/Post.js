import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Context from "../Context";

export default class Post extends Component {
  static contextType = Context;

  render() {
    const { post } = this.props;
    const votes = post.voters.split(",").filter(Boolean).map(Number).length;
    //default value for userId if it is undefined
    const { userId = 0 } = this.context;

    return (
      <li key={post.id}>
        <p>{post.content}</p>
        <button
          onClick={(e) => this.context.toggleUserHasLikedPost(post.id)}
          className={`liked-${post.voters
            .split(",")
            .map(Number)
            .includes(userId)}`}
        >
          <FontAwesomeIcon icon={faLightbulb} size="2x" />
        </button>
        <p>{votes} likes</p>
      </li>
    );
  }
}

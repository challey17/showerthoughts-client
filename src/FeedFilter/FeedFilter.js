import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FeedFilter extends Component {
  render() {
    return (
      <div className="feed-filters">
        <Link className="filter" to="/popular">
          popular
        </Link>
        <Link className="filter" to="/fresh">
          fresh
        </Link>
        <Link className="filter" to="/mine">
          my posts
        </Link>
      </div>
    );
  }
}

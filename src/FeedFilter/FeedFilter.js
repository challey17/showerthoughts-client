import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FeedFilter extends Component {
  render() {
    return (
      <div className="feed-filters">
        <Link to="/popular">popular</Link>
        <Link to="/fresh">fresh</Link>
        <Link to="/mine">mine</Link>
      </div>
    );
  }
}

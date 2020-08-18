import React, { Component } from "react";

const background = require("../lightbulbHead.png");

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <img
            src={background}
            alt={"headear background"}
            className="background-image"
          ></img>
        </header>
      </div>
    );
  }
}

import React, { Component } from "react";

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h2>Shower Thoughts</h2>
        <p>
          Share your mental ramblings, philosphize about the universe, be
          inspired, scream into the void with anonymity! Welcome, enjoy!
        </p>
        <h3>Look Ma, no log-in!</h3>
        <p>
          Wouldn't it be silly to have to create a password to experience the
          joy of shower thoughts? Yes, yes it would. When you create a post on
          shower thoughts we remember your activity based on your device, so you
          don't have to give out your email and set a password for the millionth
          time!
        </p>
      </div>
    );
  }
}

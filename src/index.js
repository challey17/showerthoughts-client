import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BroswerRouter } from "react-router-dom";

ReactDOM.render(
  <BroswerRouter>
    <App />
  </BroswerRouter>,
  document.getElementById("root")
);

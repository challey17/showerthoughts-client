import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import FeedFilter from "./FeedFilter";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <FeedFilter />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

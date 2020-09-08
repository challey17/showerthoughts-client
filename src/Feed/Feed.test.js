import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Feed from "./Feed";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const posts = [];
  ReactDOM.render(
    <BrowserRouter>
      <Feed posts={posts} />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

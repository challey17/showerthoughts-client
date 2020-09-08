import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Post from "./Post";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const post = { voters: "2,4,5" };
  ReactDOM.render(
    <BrowserRouter>
      <Post post={post} />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});

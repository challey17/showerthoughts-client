import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Header from "./Header/Header";
import CreatePost from "./CreatePost/CreatePost";
import Feed from "./Feed/Feed";
import FeedFilter from "./FeedFilter/FeedFilter";
import Welcome from "./Welcome/Welcome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower } from "@fortawesome/free-solid-svg-icons";

import { API_ENDPOINT } from "./config";

import Context from "./Context";
import "./App.css";

export default class App extends Component {
  state = {
    todaysPosts: [],
    usersPosts: [],
    userId: null,
    hasPosted: false,
    createPost: (e) => {
      e.preventDefault();
      // check if newPost is an empty string/can't submit post with no text

      if (e.target.content.value !== "" && !this.state.hasPosted) {
        const newPost = {
          user_id: this.state.userId,
          content: e.target.content.value,
        };

        // fetch call to the BACK END to save the post
        fetch(`${API_ENDPOINT}/posts`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        })
          .then((res) => res.json())
          .then((post) => {
            this.setState({
              todaysPosts: [...this.state.todaysPosts, post],
              usersPosts: [...this.state.usersPosts, post],
              hasPosted: true,
            });
          });
      }
    },

    toggleUserHasLikedPost: (id) => {
      this.setState({
        todaysPosts: this.state.todaysPosts.map((post) => {
          if (id === post.id) {
            post.voters = post.voters.split(",").includes(this.state.userId)
              ? post.voters
                  .split(",")
                  .filter((v) => v !== this.state.userId)
                  .join(",")
              : post.voters.split(",").push(this.state.userId).join(",");

            // fetch to patch that post now that it's modified

            fetch(`${API_ENDPOINT}/posts/${post.id}`, {
              method: "patch",
              body: JSON.stringify({ voters: post.voters }),
            });
          }
          return post;
        }),
      });
    },
  };

  componentDidMount() {
    if (localStorage.getItem("userId")) {
      this.setState({ userId: Number(localStorage.getItem("userId")) }, () => {
        fetch(`${API_ENDPOINT}/posts/${this.state.userId}`, {
          method: "get",
        })
          .then((res) => res.json())
          .then((posts) => {
            this.setState({ usersPosts: posts }, this.getPosts());
          });
      });
    } else {
      fetch(`${API_ENDPOINT}/users`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("userId", user.id);
          this.setState(
            {
              userId: user.id,
            },
            this.getPosts()
          );
          console.log(user.id);
        });
    }
  }

  getPosts = () => {
    fetch(`${API_ENDPOINT}/posts`)
      .then((response) => response.json())
      .then((posts) => {
        console.log("posts", posts);
        this.setState({
          todaysPosts: posts,
          hasPosted: posts.filter((p) => p.user_id === this.state.userId)
            .length,
        });
      });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="app">
          <nav className="navigation">
            <FontAwesomeIcon
              icon={faShower}
              size="2x"
              className="shower-icon"
            />

            <Link to="/" className="shower-thoughts-link">
              {" "}
              Shower Thoughts
            </Link>
          </nav>
          <Header />
          <Route exact path="/" component={Welcome} />
          {/* create-post component*/}
          {!this.state.hasPosted && <CreatePost />}
          {/* feed-filters component */}
          <FeedFilter />

          <Route
            path="/fresh"
            render={(rprops) => (
              <Feed
                {...rprops}
                posts={this.state.todaysPosts.sort((a, b) =>
                  b.created.localeCompare(a.created)
                )}
              />
            )}
          />

          <Route
            exact
            path={["/", "/popular"]}
            render={(rprops) => (
              <Feed
                {...rprops}
                posts={this.state.todaysPosts.sort((a, b) => b.votes - a.votes)}
              />
            )}
          />
          <Route
            path="/mine"
            render={(rprops) => (
              <Feed {...rprops} posts={this.state.usersPosts} />
            )}
          />
        </div>
      </Context.Provider>
    );
  }
}

//COMPONENTS
//APP
//-HEADER
//-Welcome (no authToken)
//-CREATEPOST
//-FEED-FILTER
//-FEED
//--POST

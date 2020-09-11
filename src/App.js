import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Header from "./Header/Header";
import CreatePost from "./CreatePost/CreatePost";
import Feed from "./Feed/Feed";
import FeedFilter from "./FeedFilter/FeedFilter";
import LandingPage from "./LandingPage/LandingPage";
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
        // grab post from state based on post id
        todaysPosts: this.state.todaysPosts.map((post) => {
          if (id === post.id) {
            //if voters array includes userId, filter out userId from voters array
            //i.e "unlike" the post
            post.voters = post.voters
              .split(",")
              .map(Number)
              .includes(this.state.userId)
              ? post.voters
                  .split(",")
                  .map(Number)
                  .filter((v) => v !== this.state.userId)
                  .join(",")
              : // if voters array does not include userId, push userId into voters array
                //i.e add "like"
                //split turn it into array, filter romoves the 0 bc it was an mpty string
                //map converts to numbers, concat adds the userId to array
                // join turns number array back to string
                post.voters
                  .split(",")
                  .filter(Boolean)
                  .map(Number)
                  .concat(this.state.userId)
                  .join(",");

            // fetch to patch that post now that it's modified

            fetch(`${API_ENDPOINT}/posts/${post.id}`, {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ voters: post.voters }),
            })
              .then((res) => true)
              .catch((err) => console.error(err));
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
        });
    }
  }

  getPosts = () => {
    fetch(`${API_ENDPOINT}/posts`)
      .then((response) => response.json())
      .then((posts) => {
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
          <Route
            exact
            path="/"
            component={this.state.usersPosts.length < 1 && LandingPage}
          />
          {!this.state.hasPosted && <CreatePost />}
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
                posts={this.state.todaysPosts.sort(
                  (a, b) => b.voters.length - a.voters.length
                )}
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
//-LandingPage (no authToken)
//-CREATEPOST
//-FEED-FILTER
//-FEED
//--POST

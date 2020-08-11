import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Header from "./Header/Header";
import CreatePost from "./CreatePost/CreatePost";
import Feed from "./Feed/Feed";
import FeedFilter from "./FeedFilter/FeedFilter";
import Welcome from "./Welcome/Welcome";
import Post from "./Post/Post";

import Context from "./Context";
import "./App.css";

export default class App extends Component {
  state = {
    newPost: {
      content: "",
    },

    authToken: null || "a8s79dyfahsd67y87as8dtva",
    hasPosted: false || true,
    todaysPost: 6725287, // used to add a class to their post,
    likedPosts: [2345, 779, 20927],
    todaysPosts: [
      {
        id: 2345,
        content: "The object of golf is to play the least amount of golf.",
        user: "a8s79dyfahsd67y87as8dtva",
        votes: 25,
        created: "2020-08-04TZ13:40:00",
        currentUserHasLiked: false,
      },
      {
        id: 2343,
        content:
          "Peer pressure as an adult is seeing your neighbor mow their lawn.",
        user: "aosd67f9ahsd7fhauys",
        votes: 5,
        created: "2020-08-04TZ13:05:00",
        currentUserHasLiked: true,
      },
    ],

    //callback function for createPost
    setCreatePost: (e) => this.setState({ newPost: e.target.value }),

    createPost: (e) => {
      e.preventDefault();
      // check if newPost is an empty string/can't submit post with no text

      if (this.state.newPost.content !== "") {
        const newPost = {
          id: 2346,
          content: this.state.newPost,
          user: "aosd67f9ahsd7fhauys",
          votes: 0,
          created: Date.now(),
          currentUserHasLiked: false,
        };

        this.setState({
          todaysPosts: [...this.state.todaysPosts, newPost],
          newPost: {
            content: "",
          },
        });
      }
    },

    toggleUserHasLikedPost: (id) => {
      this.setState({
        todaysPosts: this.state.todaysPosts.map((post) => {
          console.log(post);

          if (id === post.id) {
            //toggles true/false
            post.currentUserHasLiked = !post.currentUserHasLiked;
            // udpates vote count for post based on true/false toggle
            post.currentUserHasLiked === true
              ? (post.votes = post.votes + 1)
              : (post.votes = post.votes - 1);
          }
          return post;
        }),
      });
    },

    // Popular, Fresh, Mine
    // Popular is sorted by votes
    // Fresh is sorted by created
    // Mine is sorted by created but filtered by user===authToken
  };
  // check if user has posted, either show textarea or show label "you can post in x hrs"
  //get all posts from api
  //everything else filtered after component did mount
  // methods for posting and liking

  componentDidMount() {
    /*
      fetch(`${config.API_ENDPOINT}/todaysposts`).then(res=>res.json()).then(posts=>this.setState({posts}))
      that endpoint just returns todaysposts
      it's not that the posts are deleted every day, it's just that you only ever
      get that days posts from the db
      fetch(`${config.API_ENDPOINT}/usersposts`,{header:{Authorization:`Bearer ${authToken}`}}).then(res=>res.json()).then(usersPosts=>this.setState({usersPosts}))
    */
  }
  //static contextType = Context;
  render() {
    return (
      <Context.Provider value={this.state}>
        <div>
          <nav className="navigation">Nav</nav>
          <Header />
          {/* create-post component*/}
          <CreatePost />
          {/* feed-filters component */}
          <div className="feed-filters">
            <Link to="/fresh">fresh</Link>
            <Link to="/popular">fresh</Link>
            <Link to="/mine">fresh</Link>

            <button>fresh</button>
            <button>popular</button>
            <button>mine</button>
          </div>

          <Route
            path="/fresh"
            render={(rprops) => (
              <Feed
                {...rprops}
                posts={this.context.todaysPosts.sort(
                  (a, b) => b.created - a.created
                )}
              />
            )}
          />
          {/* What is going on here? do i need to use the post prop in feed component? 
          getting errors */}
          <Route
            path={["/", "/popular"]}
            render={(rprops) => (
              <Feed
                {...rprops}
                posts={this.context.todaysPosts.sort(
                  (a, b) => b.votes - a.votes
                )}
              />
            )}
          />
          <Route
            path="/mine"
            render={(rprops) => (
              <Feed {...rprops} posts={this.context.usersPosts} />
            )}
          />
          <Feed />
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

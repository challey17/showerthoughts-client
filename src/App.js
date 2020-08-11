import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
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

  // like method, and update vote/like count
  toggleUserHasLikedPost = (id) => {
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
  };

  //create post
  createPost = (e) => {
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
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <div>
          <nav className="navigation">Nav</nav>
          <header className="header">
            <h1>Shower Thoughts</h1>
          </header>
          {/* create-post component*/}
          <div className="create-post">
            <form onSubmit={(e) => this.createPost(e)}>
              <label>
                MyPost:
                <textarea
                  value={this.state.newPost.content}
                  placeholder="new post"
                  aria-label="new post"
                  onChange={(e) => this.setState({ newPost: e.target.value })}
                />
              </label>
              <input type="submit" value="submit" />
              <input type="submit" value="cancel" />
            </form>
          </div>
          {/* feed-filters component */}
          <div className="feed-filters">
            {/* <Link to="/fresh">fresh</Link> */}
            <button>fresh</button>
            <button>popular</button>
            <button>mine</button>
          </div>

          {/* <Route path="/fresh" render={rprops=><Feed {...rprops} posts={this.state.posts.sort((a,b)=>b.created-a.created)} />} /> */}
          {/* <Route path={["/","/popular"]} render={rprops=><Feed {...rprops} posts={this.state.posts.sort((a,b)=>b.votes-a.votes)} />} /> */}
          {/* <Route path="/mine" render={rprops=><Feed {...rprops} posts={this.state.usersPosts} />} /> */}
          <div className="feed">
            <ul>
              {this.state.todaysPosts.map((post) => (
                <li key={post.id}>
                  <p>{post.content}</p>
                  <button
                    onClick={(e) => this.toggleUserHasLikedPost(post.id)}
                    className={`liked-${post.currentUserHasLiked}`}
                  >
                    like
                  </button>
                  <p>{post.votes} likes</p>
                </li>
              ))}
            </ul>
          </div>
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

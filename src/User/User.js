import React, { Component } from "react";
import Story from "../components/Story/Story";
import Loading from "../components/Loading/Loading";

export default class USer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      isLoaded: false,
      loadedPosts: false,
      error: null
    };
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/user/${this.state.id}.json`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.title = (
          <div>
            <div>{res.id}</div>
            <div>
              joined {new Date(res.created * 1000).toDateString().slice(4)} has{" "}
              {res.karma} karma
            </div>
          </div>
        );
        this.setState({ isLoaded: true });
        return res.submitted.splice(0, 10);
      })
      .then(posIds => {
        return Promise.allSettled(
          posIds.map(id => {
            return fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            );
          })
        );
      })
      .then(posts => {
        return Promise.all(
          posts
            .filter(post => {
              return post.status === "fulfilled";
            })
            .map(post => {
              return post.value.json();
            })
        );
      })
      .then(posts => {
        this.posts = posts.map(post => {
          //console.log(post);
          return <Story key={post.id} {...post}></Story>;
        });
        this.setState({ loadedPosts: true });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let { isLoaded, error, loadedPosts } = this.state;
    if (!isLoaded) {
      return <Loading>Loading</Loading>;
    }
    if (error) {
      return <div>Oops error occurred</div>;
    }
    return (
      <div>
        {this.title}
        <div>{loadedPosts ? this.posts : "Loading..."}</div>
      </div>
    );
  }
}

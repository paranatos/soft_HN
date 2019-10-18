import React, { Component } from "react";
import Story from "../Story/Story";
import Comment from "../Comment/Comment";
import Loading from "../Loading/Loading";

export default class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      isLoaded: false,
      loadedComments: false,
      error: null
    };
  }
  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${this.state.id}.json`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ story: res, isLoaded: true });
        return res.kids;
      })
      .then(commentsId => {
        if (commentsId === undefined) {
          this.setState({ loadedComments: true });
          this.comments = null;
          return Promise.reject("No comments");
        }
        return Promise.allSettled(
          commentsId.map(id => {
            return fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            );
          })
        );
      })
      .then(comments => {
        return Promise.all(
          comments
            .filter(comm => {
              return comm.status === "fulfilled";
            })
            .map(comm => {
              return comm.value.json();
            })
        );
      })
      .then(res => {
        this.comments = res.map(comm => {
          return <Comment key={comm.id} {...comm}></Comment>;
        });
        this.setState({ loadedComments: true });
      })
      .catch(err => {
        if (err === "No comments") {
          return;
        } else {
          console.error(err);
          this.setState({ error: err });
        }
      });
  }
  render() {
    let { isLoaded, error, loadedComments } = this.state;
    if (!isLoaded) {
      return <Loading>Loading</Loading>;
    }
    if (error) {
      return <div>Oops error occurred</div>;
    }
    return (
      <div>
        <Story {...this.state.story}></Story>
        <div>
          {loadedComments ? this.comments : <Loading>Fetching posts</Loading>}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Story from "../Story/Story";

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.mode,
      isLoaded: false,
      error: null
    };
  }
  componentDidMount() {
    fetch(
      `https://hacker-news.firebaseio.com/v0/${this.state.type}stories.json`
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        return res.splice(0, 50);
      })
      .then(res => {
        let storys = res.map(id => {
          return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        });
        return Promise.allSettled(storys);
      })
      .then(res => {
        return Promise.all(
          res
            .filter(story => {
              return story.status === "fulfilled";
            })
            .map(story => {
              return story.value.json();
            })
        );
      })
      .then(storys => {
        this.storys = storys
          .filter(story => {
            return story; //returns null sometimes
          })
          .map(story => {
            return <Story key={story.id} {...story}></Story>;
          });
        this.setState({ isLoaded: true });
      })
      .catch(err => {
        this.setState({ isLoaded: true, error: err });
        console.log(err);
      });
  }
  render() {
    let { isLoaded, error } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Oops error occurred</div>;
    }
    return <div>{this.storys}</div>;
  }
}

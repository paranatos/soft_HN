import React, { Component } from "react";

export default class Loading extends Component {
  constructor(props) {
    super(props);
    if (Array.isArray(props.children)) {
      this.state = { text: props.children.join("") }; // TODO rewrite it mb?
    } else {
      this.state = { text: props.children };
    }
  }
  componentDidMount() {
    this.timerId = setInterval(() => {
      let text = this.state.text;
      if (text.slice(text.length - 3) === "...") {
        text = text.slice(0, text.length - 3);
        this.setState({ text: text });
      } else {
        text += ".";
        this.setState({ text: text });
      }
    }, 250);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    return <div>{this.state.text}</div>;
  }
}

import React from "react";
import { Link } from "react-router-dom";

export default function InfoPanel(props) {
  let { time, by, id, descendants } = props;
  let comments = null;
  let date = new Date(time * 1000);
  date = `${date.getDate()}
            /${date.getMonth() + 1}
            /${date.getFullYear()} 
            ${date.getHours() + 1}:${date.getMinutes() + 1}`;

  if (descendants !== undefined) {
    comments = (
      <span>
        with <Link to={`/post/${id}`}>{descendants}</Link> comments
      </span>
    );
  }
  by = <Link to={`/user/${by}`}>{by}</Link>;
  return (
    <div>
      by {by} on {date} {comments}
    </div>
  );
}

import React from "react";
import InfoPanel from "../InfoPanel/InfoPanel";

export default function Story(props) {
  let { title, url } = props;
  if (!url) {
    url = `../post/${props.id}`;
  }
  if (!title) {
    return null;
  }

  return (
    <div>
      <div>
        <a href={url}>{title}</a>
      </div>
      <InfoPanel {...props}></InfoPanel>
    </div>
  );
}

import React from "react";
import InfoPanel from "../InfoPanel/InfoPanel";

export default function Comment(props) {
  let style = {
    background: "#e1f5e5",
    marginTop: "10px",
    marginBottom: "5px"
  };
  let text = { __html: props.text };
  return (
    <div style={style}>
      <InfoPanel {...props}></InfoPanel>
      <div dangerouslySetInnerHTML={text}></div>
    </div>
  );
}

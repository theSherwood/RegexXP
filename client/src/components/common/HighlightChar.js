import React from "react";
import "./HighlightChar.css";

export default function HighlightChar(props) {
  const { char, classes } = props;
  return <span className={"highlight " + classes}>{char}</span>;
}

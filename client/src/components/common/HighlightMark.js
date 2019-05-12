import React from "react";
import "./HighlightMark.css";

export default function HighlightMark(props) {
  const { highlightText, tall } = props;
  return (
    <span className={tall ? "highlight tall" : "highlight"}>
      {highlightText}
    </span>
  );
}

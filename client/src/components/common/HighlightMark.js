import React from "react";
// import PropTypes from 'prop-types'

export default function HighlightMark(props) {
  const { highlightText, highlightColor, borderColor, tall } = props;
  return (
    <span
      style={{
        backgroundColor: highlightColor || "rgba(100,100,100,.5)",
        position: "relative",
        borderBottom: tall ? "solid 2px " + highlightColor : "",
        borderTop: tall ? "solid 2px " + highlightColor : ""
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "0px",
          right: "0px", // avoids the highlight getting left behind at wrap
          height: "100%",
          width: "100%",
          boxSizing: "border-box",
          borderLeft: `solid 1px ${borderColor || "white"}`,
          borderRight: `solid 1px ${borderColor || "white"}`
        }}
      />
      {highlightText}
    </span>
  );
}

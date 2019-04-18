import React from "react";

export default function HighlightMark(props) {
  const { highlightText, highlightColor, borderColor } = props;
  return (
    <span
      style={{
        backgroundColor: highlightColor || "rgba(100,100,100,.5)",
        position: "relative"
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

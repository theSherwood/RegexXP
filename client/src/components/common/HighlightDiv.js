import React from "react";
import PropTypes from "prop-types";

import HighlightMark from "./HighlightMark";

export default function HighlightDiv(props) {
  const { highlightArray, highlightColor, position, tall } = props;

  const styles = {
    fontFamily: "monospace",
    border: "none",
    boxSizing: "border-box",
    width: "100%",
    top: "0",
    left: "0",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    wordBreak: "break-all",
    position: position
  };

  const contents = highlightArray.map((text, index) =>
    Array.isArray(text) ? (
      <HighlightMark
        key={index}
        highlightText={text}
        highlightColor={highlightColor}
        tall={tall}
      />
    ) : (
      text
    )
  );

  return (
    <div id="targetTextBackdrop" spellCheck="false" style={styles}>
      {contents}
    </div>
  );
}

HighlightDiv.propTypes = {
  highlightArray: PropTypes.array.isRequired,
  highlightColor: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  tall: PropTypes.bool.isRequired
};

HighlightDiv.defaultProps = {
  highlightColor: "rgba(0,0,0,0.3)",
  position: "relative",
  tall: false
};

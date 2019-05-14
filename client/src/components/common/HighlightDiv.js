import React from "react";
import PropTypes from "prop-types";

import HighlightMark from "./HighlightMark";

export default function HighlightDiv(props) {
  const { highlightArray, position, tall } = props;

  const styles = {
    fontFamily: "monospace",
    border: "none",
    boxSizing: "border-box",
    width: "100%",
    top: "0",
    left: "0",
    padding: "0",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    wordBreak: "break-all",
    position: position
  };

  const contents = highlightArray.map((text, index) =>
    Array.isArray(text) ? (
      <HighlightMark key={index} highlightText={text.join("")} tall={tall} />
    ) : (
      text
    )
  );

  return (
    <div className="targetTextBackdrop" spellCheck="false" style={styles}>
      {contents}
    </div>
  );
}

HighlightDiv.propTypes = {
  highlightArray: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
  tall: PropTypes.bool.isRequired
};

HighlightDiv.defaultProps = {
  position: "relative",
  tall: false
};

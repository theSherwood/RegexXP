import React from "react";
import PropTypes from "prop-types";
import HighlightMark from "../common/HighlightMark";
// import {connect} from 'react-redux'

export default function Challenge(props) {
  const { highlightTemplate } = props;

  const content = JSON.parse(highlightTemplate).map((text, index) =>
    Array.isArray(text) ? (
      <HighlightMark key={index} highlightText={text} />
    ) : (
      text
    )
  );

  return <div style={{ fontFamily: "monospace" }}>{content}</div>;
}

Challenge.propTypes = {
  highlightTemplate: PropTypes.string.isRequired
};

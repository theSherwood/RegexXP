import React, { useState } from "react";
import processString from "../../helpers/processString";
import m from "../../helpers/merge";
// import rangy from "rangy";

import HighlightMark from "./HighlightMark";

export default function HighlightTextarea(props) {
  const { regexFilters, targetText, onTargetChange } = props;

  const [backdropElement] = useState(React.createRef());
  const [textareaElement] = useState(React.createRef());

  const onChange = e => {
    onTargetChange(e);
    setTimeout(resizeTextArea, 0);
  };

  const resizeTextArea = () => {
    textareaElement.current.style.height =
      backdropElement.current.offsetHeight + "px";
  };

  const backdropContent = processString({
    regexes: regexFilters.map(regex => new RegExp(regex[0], regex[1])),
    fn: (key, highlightText) => (
      <HighlightMark key={key} highlightText={highlightText} />
    )
  })(targetText);

  const textareaStyles = {
    fontFamily: "monospace",
    border: "none",
    boxSizing: "border-box",
    width: "100%",
    top: "-2px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    wordBreak: "break-all"
  };

  return (
    <div
      className="form-control form-control-lg"
      style={{
        overflowY: "auto",
        height: "200px"
      }}
    >
      <div
        id="targetTextGroup"
        style={{
          width: "100%",
          minHeight: "100px",
          position: "relative"
        }}
      >
        <div
          id="targetTextBackdrop"
          spellCheck="false"
          ref={backdropElement}
          style={m(textareaStyles, {
            paddingBottom: "80px",
            position: "relative"
          })}
        >
          {backdropContent}
        </div>
        <textarea
          name="targetTextArea"
          onChange={onChange}
          value={targetText}
          id="targetTextArea"
          spellCheck="false"
          placeholder="Enter target text..."
          ref={textareaElement}
          style={m(textareaStyles, {
            position: "absolute",
            resize: "none",
            backgroundColor: "transparent",
            overflowY: "hidden",
            zIndex: "1000"
          })}
        />
      </div>
    </div>
  );
}

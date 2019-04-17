import React, { useState } from "react";
import processString from "../../helpers/processString";
// import rangy from "rangy";

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
    fn: (key, match) => (
      <span
        key={key}
        style={{
          backgroundColor: "rgba(100,100,100,.5)",
          position: "relative"
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            borderLeft: "solid 1px white",
            borderRight: "solid 1px white"
          }}
        />
        {match}
      </span>
    )
  })(targetText);

  return (
    <div
      className=""
      style={{
        overflowY: "auto",
        fontSize: "1.25rem",
        lineHeight: "1.5",
        borderRadius: ".3rem",
        boxSizing: "border-box",
        border: "solid black 2px",
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
          style={{
            fontFamily: "monospace",
            fontSize: "1.25rem",
            lineHeight: "1.5",
            padding: ".5rem 1rem",
            paddingBottom: "80px",
            border: "none",
            boxSizing: "border-box",
            width: "100%",
            position: "relative",
            top: "-2px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            wordBreak: "break-all"
          }}
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
          style={{
            fontFamily: "monospace",
            fontSize: "1.25rem",
            lineHeight: "1.5",
            padding: ".5rem 1rem",
            boxSizing: "border-box",
            position: "absolute",
            border: "none",
            width: "100%",
            resize: "none",
            top: "-2px",
            backgroundColor: "transparent",
            overflowY: "hidden",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            wordBreak: "break-all",
            zIndex: "1000"
          }}
        />
      </div>
    </div>
  );
}

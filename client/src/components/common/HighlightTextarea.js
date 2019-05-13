import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import processString from "../../helpers/processString";

import HighlightMark from "./HighlightMark";

export default function HighlightTextarea(props) {
  const { regexFilters, targetText, onTargetChange } = props;
  const errors = props.errors || {};

  const [backdropElement] = useState(React.createRef());
  const [textareaElement] = useState(React.createRef());

  useEffect(() => {
    window && window.addEventListener("resize", resizeTextarea);
    return () => {
      window.removeEventListener("resize", resizeTextarea);
    };
  }, []);

  useLayoutEffect(() => {
    resizeTextarea();
  }, [targetText]);

  const onChange = e => {
    onTargetChange(e);
  };

  const resizeTextarea = () => {
    textareaElement.current.style.height =
      backdropElement.current.offsetHeight + "px";
  };

  const backdropContent = processString({
    regexes: regexFilters.map(regex => new RegExp(regex[0], regex[1])),
    fn: (key, highlightText) => (
      <HighlightMark key={key} highlightText={highlightText} />
    )
  })(targetText);

  /*
  Detect browser. Code from kennebec on stackOverflow.
  wordBreak: "break-all" is necessary in Firefox but breaking in Chrome.
  */
  const browser = (function() {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge?)\/(\d+)/);
      if (tem != null)
        return tem
          .slice(1)
          .join(" ")
          .replace("OPR", "Opera")
          .replace("Edg ", "Edge ");
    }
    return M[1].toLowerCase();
  })();

  const textareaStyles = {
    fontFamily: "monospace",
    border: "none",
    boxSizing: "border-box",
    width: "100%",
    top: "-2px",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: browser === "chrome" ? "normal" : "break-all",
    padding: "0"
  };

  return (
    <Fragment>
      <div
        className={
          "form-control form-control-lg" +
          (errors.highlights || errors.challenge ? " is-invalid" : "")
        }
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
            style={{
              ...textareaStyles,
              paddingBottom: "80px",
              position: "relative"
              //color: transparent
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
              ...textareaStyles,
              position: "absolute",
              resize: "none",
              backgroundColor: "transparent",
              overflowY: "hidden"
            }}
          />
        </div>
      </div>
      <div className="invalid-feedback">{errors.highlights}</div>
      <div className="invalid-feedback">{errors.challenge}</div>
    </Fragment>
  );
}

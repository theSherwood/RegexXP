import React, { useState, useEffect, useLayoutEffect } from "react";
import sanitizeHTML from "sanitize-html";
import processString from "../../helpers/processString";
// import rangy from "rangy";

export default function Tester() {
  const [errors, setErrors] = useState({});
  const [stableRegex, setStableRegex] = useState(["", ""]);
  const [rawRegex, setRawRegex] = useState("");
  const [targetText, setTargetText] = useState("");

  const onRegexChange = e => {
    setRawRegex(e.target.value);
    let input = e.target.value.trim();
    input = input[0] === "/" ? input.slice(1) : input; // remove whitespace and first '/'
    const finalSlashInd = input.lastIndexOf("/"); // split at last '/'
    const newRegex = [
      input.slice(0, finalSlashInd),
      input.slice(finalSlashInd + 1)
    ];
    try {
      new RegExp(newRegex[0], newRegex[1]);
      setStableRegex(newRegex);
      setErrors({});
    } catch (err) {
      setErrors({ regexError: err.toString() });
    }
  };

  const onTargetChange = e => {
    let text = sanitizeHTML(e.target.value);
    setTargetText(text);
    resizeTextArea();
  };

  const resizeTextArea = () => {
    const backdrop = document.getElementById("targetTextBackdrop");
    const textarea = document.getElementById("targetTextArea");
    textarea.style.height = backdrop.offsetHeight + "px";
  };

  const backdropContent = processString([
    {
      regex: new RegExp(stableRegex[0], stableRegex[1]),
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
    }
  ])(targetText);

  console.log(errors.regexError);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1>Tester</h1>
          <form>
            <div className="form-group">
              <input
                className={
                  "form-control form-control-lg " +
                  (errors.regexError ? "is-invalid" : "")
                }
                name="regexInput"
                placeholder="Enter regex here..."
                spellCheck="false"
                onChange={onRegexChange}
                value={rawRegex}
                style={{ fontFamily: "monospace" }}
              />
            </div>

            <div className="form-group">
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
                    onChange={onTargetChange}
                    value={targetText}
                    id="targetTextArea"
                    spellCheck="false"
                    placeholder="Enter target text..."
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

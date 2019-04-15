import React, { useState } from "react";
import sanitizeHTML from "sanitize-html";
import rangy from "rangy";

export default function Tester() {
  const [regex, setRegex] = useState("");
  const [targetText, setTargetText] = useState("");
  // const [textareaHeight, setTextareaHeight] = useState('100px')

  const onRegexChange = e => {
    setRegex();
  };

  const onTargetChange = e => {
    const backdrop = document.getElementById("targetTextBackdrop");
    const text = sanitizeHTML(e.target.value);
    backdrop.innerHTML = `<span style="background-color: yellow;">${text}<span>`;

    setTargetText(text);
    resizeTextArea();
  };

  const resizeTextArea = () => {
    const backdrop = document.getElementById("targetTextBackdrop");
    const textarea = document.getElementById("targetTextArea");
    textarea.style.height = backdrop.offsetHeight + "px";
    console.log("backdrop", backdrop.offsetHeight);
    console.log("textarea", textarea.offsetHeight);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1>Tester</h1>
          <form>
            <div className="form-group">
              <input
                className="form-control form-control-lg"
                name="regexInput"
                placeholder="Enter regex here..."
                spellCheck="false"
                onChange={onRegexChange}
              />
            </div>

            <div className="form-group">
              <div
                className=""
                style={{
                  overflowY: "auto",
                  // fontSize: "1.25rem",
                  // lineHeight: "1.5",
                  borderRadius: ".3rem",
                  boxSizing: "border-box",
                  border: "solid black 2px",
                  height: "250px"
                }}
              >
                <div
                  id="targetTextGroup"
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    position: "relative"
                  }}
                >
                  <div
                    id="targetTextBackdrop"
                    spellCheck="false"
                    style={{
                      padding: ".5rem 1rem",
                      paddingBottom: "60px",
                      boxSizing: "border-box",
                      border: "solid green 1px",
                      width: "100%",
                      position: "relative",
                      top: "-2px",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word"
                    }}
                  />
                  <textarea
                    name="targetTextArea"
                    onChange={onTargetChange}
                    value={targetText}
                    id="targetTextArea"
                    spellCheck="false"
                    style={{
                      padding: ".5rem 1rem",
                      boxSizing: "border-box",
                      position: "absolute",
                      border: "solid red 1px",
                      width: "100%",
                      resize: "none",
                      top: "-2px",
                      backgroundColor: "transparent",
                      overflowY: "hidden",
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

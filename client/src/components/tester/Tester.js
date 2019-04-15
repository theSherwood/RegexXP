import React, { useState } from "react";

export default function Tester() {
  const [regex, setRegex] = useState("");
  const [targetText, setTargetText] = useState("");

  const onTargetChange = e => {
    const backdrop = document.getElementById("targetTextBackdrop");
    const text = e.target.textContent;
    const input = document.getElementById("targetTextInput");
    const selection = window.getSelection();
    const caretOffset = selection.anchorOffset;
    input.innerHTML = "";
    input.textContent = text + "\n" + text;

    const range = document.createRange();
    range.setStart(input.childNodes[0], caretOffset);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
    setTargetText(text);
    backdrop.innerHTML = `<mark>${text}<mark>`;
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
                  {" "}
                  <div
                    id="targetTextBackdrop"
                    spellCheck="false"
                    style={{
                      padding: ".5rem 1rem",
                      boxSizing: "border-box",
                      border: "solid green 1px",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: "-2px",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word"
                    }}
                  />
                  <div
                    contentEditable="true"
                    // name="targetTextInput"
                    onInput={onTargetChange}
                    // onChange={onTargetChange}
                    // value={targetText}
                    id="targetTextInput"
                    spellCheck="false"
                    style={{
                      padding: ".5rem 1rem",
                      boxSizing: "border-box",
                      // position: "absolute",
                      position: "relative",
                      border: "solid red 1px",
                      width: "100%",
                      minHeight: "100px",
                      height: "100%",
                      resize: "none",
                      top: "-2px",
                      backgroundColor: "transparent",
                      overflowY: "hidden",
                      zIndex: "1000",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word"
                    }}
                  />
                  {/* <textarea
                    // contentEditable="true"
                    name="targetTextInput"
                    onChange={onTargetChange}
                    value={targetText}
                    className="targetTextInput"
                    style={{
                      // padding: ".5rem 1rem",
                      boxSizing: "border-box",
                      // position: "absolute",
                      position: "relative",
                      border: "solid red 1px",
                      width: "100%",
                      height: "auto",
                      resize: "none",
                      // top: "-2px",
                      backgroundColor: "transparent",
                      overflowY: "hidden",
                      zIndex: "1000"
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

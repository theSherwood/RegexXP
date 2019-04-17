import React, { useState, useEffect, useLayoutEffect } from "react";
import sanitizeHTML from "sanitize-html";
import processString from "../../helpers/processString";
// import rangy from "rangy";

import RegexFilter from "../common/RegexFilter";

export default function Challenge() {
  const [errors, setErrors] = useState(["", ""]);
  const [stableRegexes, setStableRegexes] = useState([["", ""], ["", ""]]); // An array for holding multiple regex
  const [rawRegexes, setRawRegexes] = useState(["", ""]);
  const [targetText, setTargetText] = useState("");

  const onRegexesChange = (index, e) => {
    const newRawRegexes = [...rawRegexes];
    newRawRegexes[index] = e.target.value;
    setRawRegexes(newRawRegexes);
    let input = e.target.value.trim();
    input = input[0] === "/" ? input.slice(1) : input; // remove whitespace and first '/'
    const finalSlashInd = input.lastIndexOf("/"); // split at last '/'
    const newRegex = [
      input.slice(0, finalSlashInd),
      input.slice(finalSlashInd + 1)
    ];
    try {
      new RegExp(newRegex[0], newRegex[1]);
      const newStableRegexes = [...stableRegexes];
      newStableRegexes[index] = newRegex;
      setStableRegexes(newStableRegexes);
      const newErrors = [...errors];
      newErrors[index] = "";
      setErrors(newErrors);
    } catch (err) {
      const newErrors = [...errors];
      newErrors[index] = err.toString();
      setErrors(newErrors);
    }
  };

  const onDeleteClick = (index, e) => {
    setErrors(errors.filter((error, i) => index !== i));
    setStableRegexes(stableRegexes.filter((stableRegex, i) => index !== i));
    setRawRegexes(rawRegexes.filter((rawRegex, i) => index !== i));
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

  const backdropContent = processString({
    regexes: stableRegexes.map(regex => new RegExp(regex[0], regex[1])),
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

  const regexFilters = stableRegexes.map((refexFilter, index) => (
    <RegexFilter
      key={index}
      index={index}
      error={errors[index]}
      onChange={onRegexesChange.bind(this, index)}
      value={rawRegexes[index]}
      onDeleteClick={
        rawRegexes.length > 1 ? onDeleteClick.bind(this, index) : null
      }
    />
  ));

  console.log(errors.regexError);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1>Create Challenge</h1>
          <form>
            {regexFilters}

            <div className="form-group mt-3">
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

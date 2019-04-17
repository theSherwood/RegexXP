import React from "react";

export default function RegexFilter(props) {
  const { index, error, onChange, value } = props;
  return (
    <div className="form-group">
      <input
        className={
          "form-control form-control-lg " + (error ? "is-invalid" : "")
        }
        name={`regexInput ${index}`}
        placeholder="Enter regex here..."
        spellCheck="false"
        onChange={onChange}
        value={value}
        style={{ fontFamily: "monospace" }}
      />
    </div>
  );
}

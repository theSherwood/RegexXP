import React from "react";

export default function RegexFilter(props) {
  const { index, error, onChange, value, onDeleteClick } = props;
  return (
    <div className="input-group mb-1">
      <input
        className={"form-control " + (error ? "is-invalid" : "")}
        name={`regexInput ${index}`}
        placeholder="Enter regex here..."
        spellCheck="false"
        onChange={onChange}
        value={value}
        style={{ fontFamily: "monospace" }}
      />
      {onDeleteClick ? (
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={onDeleteClick}
          >
            &times;
          </button>
        </div>
      ) : null}
    </div>
  );
}

import React from "react";

export default function RegexFilter(props) {
  const { index, error, onChange, value, onDeleteClick } = props;
  return (
    <div className="form-inline mb-1">
      <input
        className={"form-control flex-grow-1 " + (error ? "is-invalid" : "")}
        name={`regexInput ${index}`}
        placeholder="Enter regex here..."
        spellCheck="false"
        onChange={onChange}
        value={value}
        style={{ fontFamily: "monospace" }}
      />
      {onDeleteClick ? (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger ml-2"
          onClick={onDeleteClick}
        >
          &times;
        </button>
      ) : null}
    </div>
  );
}

import React from "react";

export default function Spinner(props) {
  const { size, additionalClasses } = props;
  return (
    <div className="text-center mt-5">
      <div
        className={"spinner-border " + additionalClasses}
        role="status"
        style={{ width: size, height: size }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

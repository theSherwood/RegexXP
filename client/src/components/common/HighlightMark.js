import React, { Fragment } from "react";
import HighlightChar from "./HighlightChar";

export default function HighlightMark(props) {
  const { highlightText, tall } = props;
  const tallClass = tall ? " tall " : "";
  switch (highlightText.length) {
    case 0:
      return null;
    case 1:
      return (
        <HighlightChar char={highlightText[0]} classes={"narrow" + tallClass} />
      );
    case 2:
      return (
        <Fragment>
          <HighlightChar
            char={highlightText[0]}
            classes={"wide-right" + tallClass}
          />
          <HighlightChar
            char={highlightText[1]}
            classes={"wide-left" + tallClass}
          />
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <HighlightChar
            char={highlightText[0]}
            classes={"wide-right" + tallClass}
          />
          {highlightText
            .slice(1, -1)
            .split("")
            .map((char, i) => (
              <HighlightChar
                key={i}
                char={char}
                classes={"wide-left wide-right" + tallClass}
              />
            ))}
          <HighlightChar
            char={highlightText[highlightText.length - 1]}
            classes={"wide-left" + tallClass}
          />
        </Fragment>
      );
  }
}

import React, { useState } from "react";
import sanitizeHTML from "sanitize-html";

import RegexFilter from "../common/RegexFilter";
import HighlightTextarea from "../common/HighlightTextarea";

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
      setStableRegex(["", ""]);
    }
  };

  const onTargetChange = e => {
    let text = sanitizeHTML(e.target.value);
    setTargetText(text);
  };

  return (
    <form>
      <RegexFilter
        error={errors.regexError}
        onChange={onRegexChange}
        value={rawRegex}
      />
      <div className="form-group mt-3">
        <HighlightTextarea
          regexFilters={[stableRegex]}
          targetText={targetText}
          onTargetChange={onTargetChange}
        />
      </div>
    </form>
  );
}

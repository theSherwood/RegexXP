import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addChallenge } from "../../actions/challengeActions";

import sanitizeHTML from "sanitize-html";
import processString from "../../helpers/processString";

import RegexFilter from "../common/RegexFilter";
import HighlightTextarea from "../common/HighlightTextarea";

function CreateChallenge(props) {
  const [errors, setErrors] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stableRegexes, setStableRegexes] = useState([["", ""]]); // An array for holding multiple regex
  const [rawRegexes, setRawRegexes] = useState([""]);
  const [targetText, setTargetText] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    const highlightTemplate = processString({
      regexes: stableRegexes.map(regex => new RegExp(regex[0], regex[1])),
      fn: (key, highlightText) => [highlightText] // This array signifies where a react component should be inserted
    })(targetText);

    const newChallenge = {
      user: props.auth.user.id,
      highlightTemplate: JSON.stringify(highlightTemplate),
      title,
      description
    };

    console.log(newChallenge);

    props.addChallenge(newChallenge);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeDescription = e => {
    setDescription(e.target.value);
  };

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

  const onAddClick = e => {
    setErrors([...errors, ""]);
    setStableRegexes([...stableRegexes, ["", ""]]);
    setRawRegexes([...rawRegexes, ""]);
  };

  const onTargetChange = e => {
    let text = sanitizeHTML(e.target.value);
    setTargetText(text);
  };

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

  return (
    <div className="row">
      <div className="col-lg-8 m-auto">
        <h3>Create Challenge</h3>
        <form onSubmit={onSubmit}>
          <input
            name="title"
            className="form-control mb-2"
            placeholder="Challenge title..."
            onChange={onChangeTitle}
            value={title}
            style={{ fontFamily: "monospace" }}
          />
          <textarea
            name="description"
            className="form-control"
            placeholder="Description..."
            onChange={onChangeDescription}
            value={description}
            style={{ fontFamily: "monospace", resize: "none" }}
          />

          <hr />
          {regexFilters}
          <button
            type="button"
            className="btn btn-small btn-block btn-secondary btn-sm mt-2"
            onClick={onAddClick}
          >
            Add another regex
          </button>
          <div className="form-group mt-3">
            <HighlightTextarea
              regexFilters={stableRegexes}
              targetText={targetText}
              onTargetChange={onTargetChange}
            />
          </div>
          <button type="submit" className="btn btn-warning mt-2">
            Submit Challenge
          </button>
        </form>
      </div>
    </div>
  );
}

CreateChallenge.propTypes = {
  addChallenge: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addChallenge }
)(CreateChallenge);

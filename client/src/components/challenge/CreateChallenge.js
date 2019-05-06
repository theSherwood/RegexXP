import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addChallenge, clearErrors } from "../../actions/challengeActions";

import sanitizeHTML from "sanitize-html";
import processString from "../../helpers/processString";

import RegexFilter from "../common/RegexFilter";
import HighlightTextarea from "../common/HighlightTextarea";

function CreateChallenge(props) {
  const [regexErrors, setRegexErrors] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stableRegexes, setStableRegexes] = useState([["", ""]]); // An array for holding multiple regex
  const [rawRegexes, setRawRegexes] = useState([""]);
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    return () => {
      props.clearErrors();
    };
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const highlightArray = processString({
      regexes: stableRegexes.map(regex => new RegExp(regex[0], regex[1])),
      fn: (key, highlightText) => [highlightText] // This array signifies where a react component should be inserted
    })(targetText);

    const newChallenge = {
      user: props.auth.user.id,
      highlightJSON: JSON.stringify(highlightArray),
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
      const newRegexErrors = [...regexErrors];
      newRegexErrors[index] = "";
      setRegexErrors(newRegexErrors);
    } catch (err) {
      const newRegexErrors = [...regexErrors];
      newRegexErrors[index] = err.toString();
      setRegexErrors(newRegexErrors);
    }
  };

  const onDeleteClick = (index, e) => {
    setRegexErrors(regexErrors.filter((error, i) => index !== i));
    setStableRegexes(stableRegexes.filter((stableRegex, i) => index !== i));
    setRawRegexes(rawRegexes.filter((rawRegex, i) => index !== i));
  };

  const onAddClick = e => {
    setRegexErrors([...regexErrors, ""]);
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
      error={regexErrors[index]}
      onChange={onRegexesChange.bind(this, index)}
      value={rawRegexes[index]}
      onDeleteClick={
        rawRegexes.length > 1 ? onDeleteClick.bind(this, index) : null
      }
    />
  ));

  const { errors } = props;
  return (
    <div className="row">
      <div className="col-lg-8 m-auto">
        <h3>Create Challenge</h3>
        <form onSubmit={onSubmit}>
          <input
            name="title"
            className={"form-control" + (errors.title ? " is-invalid" : "")}
            placeholder="Challenge title..."
            onChange={onChangeTitle}
            value={title}
            style={{ fontFamily: "monospace" }}
          />
          <div className="invalid-feedback">{errors.title}</div>
          <textarea
            name="description"
            className={
              "form-control mt-2" + (errors.description ? " is-invalid" : "")
            }
            placeholder="Description..."
            onChange={onChangeDescription}
            value={description}
            style={{ fontFamily: "monospace", resize: "none" }}
          />
          <div className="invalid-feedback">{errors.description}</div>
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
              errors={errors}
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
  auth: state.auth,
  errors: state.challenge.errors
});

export default connect(
  mapStateToProps,
  { addChallenge, clearErrors }
)(CreateChallenge);

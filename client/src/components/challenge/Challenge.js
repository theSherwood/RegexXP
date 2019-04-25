import React, { useEffect, useState, Fragment } from "react";
import processString from "../../helpers/processString";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import HighlightDiv from "../common/HighlightDiv";
import RegexFilter from "../common/RegexFilter";
import { Link } from "react-router-dom";
import { getChallenge } from "../../actions/challengeActions";

function Challenge(props) {
  const [errors, setErrors] = useState({});
  const [stableRegex, setStableRegex] = useState(["", ""]);
  const [rawRegex, setRawRegex] = useState("");
  const [targetText, setTargetText] = useState("");
  const [highlightArray, setHighlightArray] = useState([]);

  const { challenge, loading } = props.challenge;
  const { highlightTemplate, description, title, user, _id } = challenge;

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

  useEffect(() => {
    props.getChallenge(props.match.params.id);
  }, []);

  useEffect(() => {
    if (Object.keys(challenge).length !== 0 && !loading) {
      const highlightArray = JSON.parse(highlightTemplate);
      setHighlightArray(highlightArray);
      const challengeTextArray = highlightArray.map(text => {
        return Array.isArray(text) ? text[0] : text;
      });
      setTargetText(challengeTextArray.join(""));
    }
  }, [highlightTemplate]);

  function arraysEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
      if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
        if (!arraysEqual(arr1[i], arr2[i])) return false;
      } else if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  let challengeContent;
  if (Object.keys(challenge).length == 0 || loading) {
    challengeContent = (
      <Spinner size="40vmin" additionalClasses="text-warning" />
    );
  } else {
    let attemptArray = processString({
      regexes: [new RegExp(stableRegex[0], stableRegex[1])],
      fn: (key, highlightText) => [highlightText] // This array signifies where a react component should be inserted
    })(targetText);
    if (!attemptArray) {
      attemptArray = [];
    }

    let successStyleCard;
    if (attemptArray.length > 0 && arraysEqual(attemptArray, highlightArray)) {
      // successStyleCard = { boxShadow: "inset 0 0 5px 2px #343a40" };
    }

    challengeContent = (
      <div className="card mt-2" style={successStyleCard}>
        <div className="card-content">
          <div className="container p-4" style={{ fontFamily: "monospace" }}>
            <h4 className="float">{title}</h4>
            <p className="lead">{user.handle}</p>
            <p className="text-muted">{description}</p>
            <RegexFilter
              error={errors.regexError}
              onChange={onRegexChange}
              value={rawRegex}
            />
          </div>
        </div>
        <div
          className="container mt-1 mb-3"
          style={{
            overflowY: "auto",
            maxHeight: "80vh"
          }}
        >
          <div className="wrapper" style={{ position: "relative" }}>
            <HighlightDiv
              highlightColor="#ffc107"
              highlightArray={highlightArray}
              tall={true}
            />
            <HighlightDiv
              highlightColor="#ccc"
              highlightArray={attemptArray}
              position="absolute"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Link className="btn btn-warning btn-sm" to={"/challenges"}>
        Back to challenges
      </Link>
      {challengeContent}
      <button type="button" className="btn btn-warning btn-sm mt-3">
        See comments
      </button>
    </Fragment>
  );
}

Challenge.propTypes = {
  getChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  challenge: state.challenge,
  laoding: state.loading
});

export default connect(
  mapStateToProps,
  { getChallenge }
)(Challenge);

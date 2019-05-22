import React, { useEffect, useState, useMemo, Fragment } from "react";
import processString from "../../helpers/processString";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../common/Spinner";
import HighlightDiv from "../common/HighlightDiv";
import RegexFilter from "../common/RegexFilter";
import Thread from "../thread/Thread";

import {
  getChallenge,
  addSolution,
  setChallenge
} from "../../actions/challengeActions";

function Challenge(props) {
  const { isAuthenticated } = props;
  const { challenge } = props.challenge;
  const { highlightJSON, description, title, user, _id } = challenge;

  const [regexError, setRegexError] = useState("");
  const [stableRegex, setStableRegex] = useState(["", ""]);
  const [rawRegex, setRawRegex] = useState("");
  const [completed, setCompleted] = useState(false);
  const [fetching, setFetching] = useState(
    props.match.params.id === challenge._id ? false : true
  );

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
      setRegexError("");
    } catch (err) {
      setRegexError(err.toString());
      setStableRegex(["", ""]);
    }
  };

  useEffect(() => {
    if (fetching) {
      props.getChallenge(props.match.params.id);
      setFetching(false);
    }
    return () => props.setChallenge({});
  }, []);

  const highlightArray = useMemo(() => {
    if (highlightJSON) {
      return JSON.parse(highlightJSON);
    }
  }, [highlightJSON]);

  const targetText = useMemo(() => {
    if (highlightArray) {
      const challengeTextArray = highlightArray.map(text => {
        return Array.isArray(text) ? text[0] : text;
      });
      return challengeTextArray.join("");
    }
  }, [highlightArray]);

  const onSubmitSolution = e => {
    e.preventDefault();
    props.addSolution(_id, { regex: rawRegex });
    setCompleted(true);
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
      if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
        if (!arraysEqual(arr1[i], arr2[i])) return false;
      } else if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  let challengeContent;
  if (Object.keys(challenge).length == 0 || fetching) {
    challengeContent = <Spinner />;
  } else {
    let attemptArray = processString({
      regexes: [new RegExp(stableRegex[0], stableRegex[1])],
      fn: (key, highlightText) => [highlightText] // This array signifies where a react component should be inserted
    })(targetText);
    if (!attemptArray) {
      attemptArray = [];
    }

    let success = false;
    if (attemptArray.length > 0 && arraysEqual(attemptArray, highlightArray)) {
      success = true;
    }

    challengeContent = (
      <div className="card mt-2">
        <div className="card-content">
          <div className="container p-4" style={{ fontFamily: "monospace" }}>
            <h4 className="page-title mb-4">{title}</h4>

            <p className="lead">{user.handle}</p>
            <p className="text-muted">{description}</p>
            {completed ? (
              <p className="text-center">Successfully Completed</p>
            ) : (
              <form onSubmit={onSubmitSolution}>
                <RegexFilter
                  error={regexError}
                  onChange={onRegexChange}
                  value={rawRegex}
                  index=""
                />
                {success && isAuthenticated ? (
                  <button
                    className="float-right btn btn-block btn-sm btn-default mt-2 mb-2"
                    type="submit"
                  >
                    Submit solution
                  </button>
                ) : null}
              </form>
            )}
          </div>
        </div>
        <div
          className="container mb-2 pt-3 pl-4 pr-4 pb-4"
          style={{
            overflowY: "auto",
            maxHeight: "80vh"
          }}
        >
          <div className="wrapper" style={{ position: "relative" }}>
            <HighlightDiv highlightArray={highlightArray} tall={true} />
            {completed ? null : (
              <HighlightDiv highlightArray={attemptArray} position="absolute" />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Link className="btn btn-default btn-sm" to={"/challenges"}>
        Back to challenges
      </Link>
      {challengeContent}
      {isAuthenticated ? (
        <Thread challengeId={_id} />
      ) : (
        <p className="mt-3 text-muted text-center">
          <Link to="/login">Login</Link> to submit a solution or to see any
          available discussion or solutions to this challenge.
        </p>
      )}
    </Fragment>
  );
}

Challenge.propTypes = {
  getChallenge: PropTypes.func.isRequired,
  setChallenge: PropTypes.func.isRequired,
  addSolution: PropTypes.func.isRequired,
  challenge: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  challenge: state.challenge,
  loading: state.loading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getChallenge, addSolution, setChallenge }
)(Challenge);

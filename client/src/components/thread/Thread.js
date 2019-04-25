import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import Solutions from "./Solutions";
import Comments from "./Comments";

import {
  getCommentsToChallenge,
  getSolutions
} from "../../actions/challengeActions";

function Thread(props) {
  const { challengeId, comments, solutions } = props;
  const [showSolutions, setShowSolutions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [fetching, setFetching] = useState(false);

  const seeComments = () => {
    props.getCommentsToChallenge(challengeId);
    setShowComments(true);
    setShowSolutions(false);
    setFetching(true);
  };

  const seeSolutions = () => {
    props.getSolutions(challengeId);
    setShowComments(false);
    setShowSolutions(true);
    setFetching(true);
  };

  useEffect(() => {
    setFetching(false);
  }, [comments, solutions]);

  let contents;
  if (fetching) {
    contents = <Spinner size="40vmin" additionalClasses="text-warning" />;
  } else if (showComments) {
    contents = <Comments comments={comments} />;
  } else if (showSolutions) {
    contents = <Solutions solutions={solutions} />;
  }
  return (
    <Fragment>
      <div className="container">
        <div className="row mb-3">
          <button
            onClick={seeComments}
            type="button"
            className={
              "btn btn-secondary btn-sm mt-3 col " +
              (showComments ? "btn-warning" : "btn-secondary")
            }
          >
            See comments
          </button>
          <button
            onClick={seeSolutions}
            type="button"
            className={
              "btn btn-secondary btn-sm mt-3 col " +
              (showSolutions ? "btn-warning" : "btn-secondary")
            }
          >
            See solutions
          </button>
        </div>
      </div>
      {contents}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  comments: state.challenge.comments,
  solutions: state.challenge.solutions
});

export default connect(
  mapStateToProps,
  { getCommentsToChallenge, getSolutions }
)(Thread);

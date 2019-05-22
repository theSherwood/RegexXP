import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";
import Solutions from "./Solutions";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

import {
  getCommentsToChallenge,
  getSolutions,
  addComment
} from "../../actions/challengeActions";

function Thread(props) {
  const { challengeId, comments, solutions } = props;
  const [showSolutions, setShowSolutions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [fetching, setFetching] = useState(false);

  const createCommentCallback = text => {
    props.addComment(challengeId, text);
  };

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
  if (showComments) {
    contents = (
      <Fragment>
        <CreateComment createCommentCallback={createCommentCallback} />
        {fetching ? <Spinner /> : <Comments comments={comments} />}
      </Fragment>
    );
  } else if (showSolutions) {
    contents = fetching ? <Spinner /> : <Solutions solutions={solutions} />;
  }
  return (
    <Fragment>
      <div className="container">
        <div className="row mb-3">
          <button
            onClick={seeComments}
            type="button"
            className={
              "btn btn-sm mt-3 btn-wide col " +
              (showComments ? "btn-default" : "btn-secondary")
            }
          >
            See comments
          </button>
          <button
            onClick={seeSolutions}
            type="button"
            className={
              "btn btn-sm mt-3 btn-wide col " +
              (showSolutions ? "btn-default" : "btn-secondary")
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
  { getCommentsToChallenge, getSolutions, addComment }
)(Thread);

import React from "react";
import { connect } from "react-redux";

import Spinner from "../common/Spinner";

import {
  getCommentsToChallenge,
  getSolutions
} from "../../actions/challengeActions";

function Thread(props) {
  const { challengeId } = props;

  const seeComments = () => {
    props.getCommentsToChallenge(challengeId);
  };

  const seeSolutions = () => {
    props.getSolutions(challengeId);
  };

  let contents;
  return (
    <div className="row">
      <button
        onClick={seeComments}
        type="button"
        className="btn btn-secondary btn-sm mt-3 col"
      >
        See comments
      </button>
      <div className="col" />
      <button
        onClick={seeSolutions}
        type="button"
        className="btn btn-secondary btn-sm mt-3 col"
      >
        See solutions
      </button>
      {contents}
    </div>
  );
}

const mapStateToProps = state => ({
  comments: state.comments,
  solutions: state.solutions
});

export default connect(
  mapStateToProps,
  { getCommentsToChallenge, getSolutions }
)(Thread);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HighlightMark from "../common/HighlightMark";
import { Link } from "react-router-dom";
import { getChallenge } from "../../actions/challengeActions";
// import {connect} from 'react-redux'

function Challenge(props) {
  const { challenge, loading } = props.challenge;
  const { highlightTemplate, description, title, user, _id } = challenge;
  console.log(challenge);

  useEffect(() => {
    props.getChallenge(props.match.params.id);
  }, []);

  let challengeContent;
  if (Object.keys(challenge).length == 0 || loading) {
    challengeContent = (
      <div class="text-center mt-5">
        <div
          class="spinner-border text-warning"
          role="status"
          style={{ width: "100px", height: "100px" }}
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    const targetText = JSON.parse(highlightTemplate).map((text, index) =>
      Array.isArray(text) ? (
        <HighlightMark
          key={index}
          highlightText={text}
          highlightColor={"#ffc107"}
        />
      ) : (
        text
      )
    );
    challengeContent = (
      <div className="card mt-2">
        <div className="card-content">
          <div className="container p-4" style={{ fontFamily: "monospace" }}>
            <h4 className="float">{title}</h4>
            <p className="lead">{user.handle}</p>
            <p className="text-muted">{description}</p>
            <div className="container">{targetText}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Link className="btn btn-warning btn-sm" to={"/challenges"}>
        Back to challenges
      </Link>
      {challengeContent}
    </div>
  );
}

Challenge.propTypes = {
  getChallenge: PropTypes.func.isRequired,
  challenge: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  challenge: state.challenge,
  laoding: state.loading
});

export default connect(
  mapStateToProps,
  { getChallenge }
)(Challenge);

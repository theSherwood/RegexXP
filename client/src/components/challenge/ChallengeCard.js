import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HighlightDiv from "../common/HighlightDiv";
import { setChallenge } from "../../actions/challengeActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function ChallengeCard(props) {
  const { highlightJSON, description, title, user, _id } = props.challenge;
  const [highlightArray] = useState(JSON.parse(highlightJSON));

  const handleButtonClick = () => {
    props.setChallenge(props.challenge);
    props.history.push(`/challenges/${_id}`);
  };

  return (
    <div className="card mb-2">
      <div className="card-content">
        <div className="container p-4" style={{ fontFamily: "monospace" }}>
          <div className="clearfix">
            <h4 className="float-left">{title}</h4>
            <button
              className="float-right btn btn-warning btn-sm"
              type="button"
              onClick={handleButtonClick}
            >
              Attempt
            </button>
          </div>
          <p className="lead">{user.handle}</p>
          <p className="text-muted">{description}</p>
        </div>
      </div>
      <div
        className="container mb-3"
        style={{
          overflowY: "auto",
          maxHeight: "60vh"
        }}
      >
        <HighlightDiv
          highlightColor="#ffc107"
          highlightArray={highlightArray}
        />
      </div>
    </div>
  );
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired
};

export default connect(
  null,
  { setChallenge }
)(withRouter(ChallengeCard));

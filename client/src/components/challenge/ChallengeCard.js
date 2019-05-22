import React, { useState } from "react";
import PropTypes from "prop-types";
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
    <div className="card mb-2" style={{ position: "relative" }}>
      <div className="card-content">
        <div className="container pt-5 pl-4 pr-4 pb-3">
          {/* <div className="d-flex justify-content-between"> */}
          <h4
            style={{
              flex: "1 0 20px",
              border: "solid 1px rgba(0,0,0,.125",
              padding: "10px",
              wordBreak: "break-all"
            }}
          >
            {title}
          </h4>
          <div>
            <button
              className="btn btn-sm"
              type="button"
              onClick={handleButtonClick}
              style={{
                background: "black",
                color: "#ffc107",
                position: "absolute",
                right: "8px",
                top: "8px"
              }}
            >
              <b>Attempt</b>
            </button>
            {/* </div> */}
          </div>
          <p className="lead mb-1">{user.handle}</p>
          <p className="text-muted mb-0">{description}</p>
        </div>
      </div>
      <hr className="mt-0" />
      <div
        className="container mb-3"
        style={{
          overflowY: "auto",
          maxHeight: "60vh"
        }}
      >
        <HighlightDiv highlightArray={highlightArray} />
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

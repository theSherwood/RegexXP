import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HighlightDiv from "../common/HighlightDiv";

export default function ChallengeCard(props) {
  const { highlightTemplate, description, title, user, _id } = props.challenge;
  const [highlightArray] = useState(JSON.parse(highlightTemplate));

  return (
    <div className="card mb-2">
      <div className="card-content">
        <div className="container p-4" style={{ fontFamily: "monospace" }}>
          <div className="clearfix">
            <h4 className="float-left">{title}</h4>
            <Link
              className="float-right btn btn-warning btn-sm"
              to={`/challenges/${_id}`}
            >
              Attempt
            </Link>
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

import React from "react";
import PropTypes from "prop-types";
import HighlightMark from "../common/HighlightMark";
import { Link } from "react-router-dom";
// import {connect} from 'react-redux'

export default function ChallengeCard(props) {
  const { highlightTemplate, description, title, user, _id } = props.challenge;

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

  return (
    <div className="container">
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
            <div className="container">{targetText}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired
};

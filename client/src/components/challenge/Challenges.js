import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChallengeCard from "./ChallengeCard";
import { getChallenges } from "../../actions/challengeActions";

function Challenges(props) {
  const { challenges, loading } = props.challenge;

  useEffect(() => {
    props.getChallenges();
  }, []);

  let challengesContent;
  if (challenges === null || loading) {
    challengesContent = (
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
    challengesContent = challenges.map((challenge, index) => (
      <ChallengeCard key={index} challenge={challenge} />
    ));
  }

  return (
    <div>
      <h3>Challenges</h3>
      {challengesContent}
    </div>
  );
}

Challenges.propTypes = {
  challenge: PropTypes.object.isRequired,
  getChallenges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  challenge: state.challenge
});

export default connect(
  mapStateToProps,
  { getChallenges }
)(Challenges);

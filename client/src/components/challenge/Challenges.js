import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Challenge from "./Challenge";
import { getChallenges } from "../../actions/challengeActions";

function Challenges(props) {
  const { challenges, loading } = props.challenge;

  useEffect(() => {
    console.log("here we are");
    props.getChallenges();
  }, []);

  return (
    <div>
      {challenges.map((challenge, index) => (
        <Challenge
          key={index}
          highlightTemplate={challenge.highlightTemplate}
        />
      ))}
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

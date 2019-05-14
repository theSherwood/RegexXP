import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChallengeCard from "./ChallengeCard";
import Spinner from "../common/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getChallenges } from "../../actions/challengeActions";

function Challenges(props) {
  const { challenges, loading } = props.challenge;

  useEffect(() => {
    props.getChallenges();
  }, []);

  let challengesContent;
  if (challenges === null || loading) {
    challengesContent = (
      <CSSTransition in={true} appear={true} timeout={300} classNames="spinner">
        <Spinner />
      </CSSTransition>
    );
  } else {
    challengesContent = (
      <TransitionGroup>
        {challenges.map((challenge, index) => (
          <CSSTransition
            key={index}
            in={true}
            timeout={500}
            appear={true}
            classNames="challenge-card"
          >
            <ChallengeCard challenge={challenge} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
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

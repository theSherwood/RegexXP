import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getChallengesByUser,
  clearChallengeUser
} from "../../actions/challengeActions";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../common/Spinner";
import ChallengeCard from "../challenge/ChallengeCard";

const User = props => {
  const { challenges, loading, challengeUser } = props.challenge;

  useEffect(() => {
    props.getChallengesByUser(props.match.params.id);
    return () => {
      props.clearChallengeUser();
    };
  }, [props.match.params.id]);

  let challengesContent;
  if (challengeUser === null || loading) {
    challengesContent = (
      <CSSTransition in={true} appear={true} timeout={300} classNames="spinner">
        <Spinner />
      </CSSTransition>
    );
  } else {
    challengesContent = challenges.length ? (
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
    ) : (
      <p>
        <em>No results found...</em>
      </p>
    );
  }

  return (
    <div>
      <h3 className="page-title mb-4">
        {challengeUser ? challengeUser.handle || challengeUser.email : null}
      </h3>
      {challengesContent}
    </div>
  );
};

const mapStateToProps = state => ({
  challenge: state.challenge
});

export default connect(
  mapStateToProps,
  { getChallengesByUser, clearChallengeUser }
)(User);

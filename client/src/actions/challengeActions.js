import axios from "axios";

import { ADD_CHALLENGE, GET_ERRORS, GET_CHALLENGES, IS_LOADING } from "./types";

// Add Challenge
export const addChallenge = challengeData => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/challenges", challengeData)
    .then(res => {
      dispatch({
        type: ADD_CHALLENGE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Challenges
export const getChallenges = () => dispatch => {
  axios
    .get("/api/challenges")
    .then(res =>
      dispatch({
        type: GET_CHALLENGES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setLoading = () => {
  return {
    type: IS_LOADING
  };
};

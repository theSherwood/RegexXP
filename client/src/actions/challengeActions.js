import axios from "axios";

import { ADD_CHALLENGE, GET_ERRORS } from "./types";

// Add Challenge
export const addChallenge = challengeData => dispatch => {
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

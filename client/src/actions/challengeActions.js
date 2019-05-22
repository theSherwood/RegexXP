import axios from "axios";

import {
  ADD_CHALLENGE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_CHALLENGES,
  GET_CHALLENGE,
  SET_CURRENT_CHALLENGE,
  GET_COMMENTS_TO_C,
  IS_LOADING,
  GET_SOLUTIONS,
  ADD_SOLUTION,
  ADD_COMMENT,
  SET_CHALLENGE_USER,
  CLEAR_CHALLENGE_USER
} from "./types";

// Add Challenge
export const addChallenge = (challengeData, history) => dispatch => {
  axios
    .post("/api/challenges", challengeData)
    .then(res => {
      dispatch({
        type: ADD_CHALLENGE,
        payload: res.data
      });
      history.push("/challenges");
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
  dispatch(setLoading());
  axios
    .get("/api/challenges")
    .then(res => {
      dispatch({
        type: GET_CHALLENGES,
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

// Get Challenges by query string
export const getChallengesByQuery = query => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/challenges/query", { query })
    .then(res => {
      dispatch({
        type: GET_CHALLENGES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get Challenges by user
export const getChallengesByUser = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/challenges/user/${id}`)
    .then(res => {
      dispatch({
        type: SET_CHALLENGE_USER,
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

// Get challenge by id
export const getChallenge = challengeId => dispatch => {
  axios
    .get(`/api/challenges/${challengeId}`)
    .then(res =>
      dispatch({
        type: GET_CHALLENGE,
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

// Set challenge from the one of the current list of challenges
export const setChallenge = challenge => dispatch => {
  dispatch({
    type: SET_CURRENT_CHALLENGE,
    payload: challenge
  });
};

// Get solutions to a challenge
export const getSolutions = challengeId => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/challenges/${challengeId}/solutions`)
    .then(res =>
      dispatch({
        type: GET_SOLUTIONS,
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

// Get comments to a challenge
export const getCommentsToChallenge = challengeId => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/challenges/${challengeId}/comments`)
    .then(res =>
      dispatch({
        type: GET_COMMENTS_TO_C,
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

// Add a solution to a challenge
export const addSolution = (challengeId, solution) => dispatch => {
  axios
    .post(`/api/challenges/${challengeId}/add-solution`, solution)
    .then(res =>
      dispatch({
        type: ADD_SOLUTION,
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

// Add a comment to a challenge
export const addComment = (challengeId, text) => dispatch => {
  axios
    .post(`/api/challenges/${challengeId}/add-comment`, { text })
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
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

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};

export const clearChallengeUser = () => dispatch => {
  console.log("actions");
  dispatch({
    type: CLEAR_CHALLENGE_USER
  });
};

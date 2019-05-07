import axios from "axios";
import axiosConfigToken from "../helpers/axiosConfigToken";
import jwt_decode from "jwt-decode";

import { SET_USER, GET_AUTH_ERRORS, CLEAR_AUTH_ERRORS } from "../actions/types";

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      dispatch(handleJWT(token));
    })
    .catch(err => {
      dispatch({
        type: GET_AUTH_ERRORS,
        payload: err.response.data
      });
    });
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove token from axios header
  axiosConfigToken(false);
  // Set user to empty object
  dispatch(setUser());
};

// Register user
export const registerUser = userData => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => res.json({ success: "true" }))
    .catch(err =>
      dispatch({
        type: GET_AUTH_ERRORS,
        payload: err.response.data
      })
    );
};

// Handle token and set user
export const handleJWT = token => dispatch => {
  try {
    // Decode token for user data
    const decodedUser = jwt_decode(token);
    localStorage.setItem("jwtToken", token);
    // Configure axios Authorization header
    axiosConfigToken(token);
    // Set user
    dispatch(setUser(decodedUser));
  } catch (err) {
    dispatch({
      type: GET_AUTH_ERRORS,
      payload: err.message
    })
  }
}

// Set current user
export const setUser = data => {
  return {
    type: SET_USER,
    payload: data || {}
  };
};

// Clear auth errors
export const clearAuthErrors = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_ERRORS
  });
};

// Google Oauth
export const googleOauth = () => {
  console.log("action submitted");
  axios.get("/auth/google");
};

// Github Oauth
export const githubOauth = () => {
  console.log("action submitted");
  axios.get("/auth/github")
};

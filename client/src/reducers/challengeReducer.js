import {
  ADD_CHALLENGE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_CHALLENGES,
  GET_CHALLENGE,
  SET_CURRENT_CHALLENGE,
  IS_LOADING,
  GET_SOLUTIONS,
  GET_COMMENTS_TO_C,
  ADD_SOLUTION,
  ADD_COMMENT,
  SET_CHALLENGE_USER,
  CLEAR_CHALLENGE_USER
} from "../actions/types";

const initialState = {
  challenges: [],
  challenge: {},
  solutions: [],
  solution: {},
  comments: [],
  comment: {},
  loading: false,
  challengeUser: null,
  errors: {}
};

export default function(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case ADD_CHALLENGE:
      return {
        ...state,
        challenges: [payload, ...state.challenges]
      };
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SOLUTIONS:
      return {
        ...state,
        solutions: payload,
        loading: false
      };
    case GET_CHALLENGES:
      return {
        ...state,
        challenges: payload,
        loading: false
      };
    case GET_CHALLENGE:
      return {
        ...state,
        challenge: payload,
        loading: false
      };
    case SET_CURRENT_CHALLENGE:
      return {
        ...state,
        challenge: payload
      };
    case GET_COMMENTS_TO_C:
      return {
        ...state,
        comments: payload,
        loading: false
      };
    case ADD_SOLUTION: // This may not be necessary if we redirect on submission
      return {
        ...state,
        solutions: [payload, ...state.solutions]
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [payload, ...state.comments]
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      };
    case SET_CHALLENGE_USER:
      return {
        ...state,
        challengeUser: { handle: payload.handle, email: payload.email },
        challenges: payload.challenges,
        loading: false
      };
    case CLEAR_CHALLENGE_USER:
      console.log("running");
      return {
        ...state,
        challengeUser: null,
        challenges: []
      };
    default:
      return state;
  }
}

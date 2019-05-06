import {
  ADD_CHALLENGE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_CHALLENGES,
  GET_CHALLENGE,
  IS_LOADING,
  GET_SOLUTIONS,
  GET_COMMENTS_TO_C,
  ADD_SOLUTION
} from "../actions/types";

const initialState = {
  challenges: [],
  challenge: {},
  solutions: [],
  solution: {},
  comments: [],
  comment: {},
  loading: false,
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
    default:
      return state;
  }
}

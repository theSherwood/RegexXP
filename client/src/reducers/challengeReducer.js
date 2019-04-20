import {
  ADD_CHALLENGE,
  GET_ERRORS,
  GET_CHALLENGES,
  GET_CHALLENGE,
  IS_LOADING
} from "../actions/types";

const initialState = {
  challenges: [],
  challenge: {},
  solutions: [],
  solution: {},
  comments: [],
  comment: {},
  loading: false
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
    default:
      return state;
  }
}

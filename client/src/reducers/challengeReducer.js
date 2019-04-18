import { ADD_CHALLENGE, GET_ERRORS } from "../actions/types";

const initialState = {
  challenges: [],
  challenge: {},
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
    default:
      return state;
  }
}

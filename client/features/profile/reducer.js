import { GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS } from "./actions";

const initialState = {};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload.profile
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload.profile
      };
    default:
      return state;
  }
};

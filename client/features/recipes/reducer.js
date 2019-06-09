import { GET_RECIPES_SUCCESS } from "./actions";

const initialState = [];

export const recipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES_SUCCESS:
      return [...action.payload.recipes];
    default:
      return state;
  }
};

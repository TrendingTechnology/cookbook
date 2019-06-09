import { ON_PREFERENCES_CHANGED } from "./actions";

const initialState = {
  preparationTime: "20",
  servings: "1",
  eatingHabits: "all"
};

export const preferences = (state = initialState, action) => {
  switch (action.type) {
    case ON_PREFERENCES_CHANGED:
      return {
        ...state,
        ...action.payload.preferences
      };
    default:
      return state;
  }
};

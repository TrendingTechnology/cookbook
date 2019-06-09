import { START_LOADING, STOP_LOADING } from "./actions";

const initialState = {
  isLoading: false
};

export const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

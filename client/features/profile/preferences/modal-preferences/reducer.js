import { SHOW_PREFERENCES_MODAL } from "./actions";
import { GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS } from "../../actions";

const initialState = {
  isPreferencesModalDisplayed: false
};

export const modalPreferences = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PREFERENCES_MODAL:
      return {
        ...state,
        isPreferencesModalDisplayed: true
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isPreferencesModalDisplayed:
          action.payload.profile.preferences === undefined
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isPreferencesModalDisplayed: false
      };
    default:
      return state;
  }
};

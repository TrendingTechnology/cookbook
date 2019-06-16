import { combineReducers } from "redux";

import { loading } from "../components/loading/reducer";
import { forgotPassword } from "../features/authentication/forgot-password/reducer";
import { signIn } from "../features/authentication/sign-in/reducer";
import { signUp } from "../features/authentication/sign-up/reducer";
import { recipes } from "../features/recipes/reducer";
import { profile } from "../features/profile/reducer";
import { preferences } from "../features/profile/preferences/reducer";
import { modalPreferences } from "../features/profile/preferences/modal-preferences/reducer";
import { SIGN_OUT_REQUEST } from "../features/profile/actions";

const appReducer = combineReducers({
  loading,
  forgotPassword,
  signIn,
  signUp,
  recipes,
  profile,
  preferences,
  modalPreferences
});

export const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT_REQUEST) {
    state = undefined;
  }

  return appReducer(state, action);
};

import { all, fork } from "redux-saga/effects";

import { watcherForgotPasswordSaga } from "../features/authentication/forgot-password/sagas";
import { watcherSignInSaga } from "../features/authentication/sign-in/sagas";
import { watcherSignUpSaga } from "../features/authentication/sign-up/sagas";
import { watcherGetRecipesSaga } from "../features/recipes/sagas";
import { watcherGetProfileSaga } from "../features/profile/sagas";
import { watcherUpdateProfileSaga } from "../features/profile/sagas";

export default function* root() {
  yield all([
    fork(watcherForgotPasswordSaga),
    fork(watcherSignInSaga),
    fork(watcherSignUpSaga),
    fork(watcherGetRecipesSaga),
    fork(watcherGetProfileSaga),
    fork(watcherUpdateProfileSaga)
  ]);
}

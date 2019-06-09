import { takeLatest, call, put } from "redux-saga/effects";
import firebase from "firebase";

import { SIGN_UP_REQUEST, SIGN_UP_FAILURE } from "./actions";
import {
  START_LOADING,
  STOP_LOADING
} from "../../../components/loading/actions";
import { post } from "../../../helpers/api-helper";
import { SHOW_PREFERENCES_MODAL } from "../../profile/preferences/modal-preferences/actions";

export function* watcherSignUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, workerSignUpSaga);
}

function* workerSignUpSaga({ payload }) {
  try {
    yield call(() => startLoading());
    const responseSignUp = yield call(() => signUp(payload));
    const { user } = responseSignUp;
    const { email, displayName, emailVerified, uid } = user;

    yield call(() => sendEmailVerification(user));
    yield call(() =>
      post("authentication/signup", {
        uid
      })
    );
    yield put({ type: SHOW_PREFERENCES_MODAL });
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, payload: { error: error.message } });
  } finally {
    yield call(() => stopLoading());
  }
}

function* startLoading() {
  yield put({
    type: START_LOADING
  });
}
function* stopLoading() {
  yield put({
    type: STOP_LOADING
  });
}

const signUp = ({ email, password }) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

const sendEmailVerification = user => user.sendEmailVerification();

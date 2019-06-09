import { takeLatest, call, put } from "redux-saga/effects";
import firebase from "firebase";

import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./actions";
import {
  START_LOADING,
  STOP_LOADING
} from "../../../components/loading/actions";

export function* watcherSignInSaga() {
  yield takeLatest(SIGN_IN_REQUEST, workerSignInSaga);
}

function* workerSignInSaga({ payload }) {
  try {
    yield call(() => startLoading());
    const firebaseResponse = yield call(() => signIn(payload));
    const { email, displayName, emailVerified, uid } = firebaseResponse.user;

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user: { email, displayName, emailVerified, uid } }
    });
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, payload: { error: error.message } });
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
const signIn = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

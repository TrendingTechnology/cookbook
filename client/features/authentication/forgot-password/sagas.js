import { takeLatest, call, put } from "redux-saga/effects";
import firebase from "firebase";

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE
} from "./actions";
import {
  START_LOADING,
  STOP_LOADING
} from "../../../components/loading/actions";

export function* watcherForgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, workerForgotPasswordSaga);
}

function* workerForgotPasswordSaga({ payload }) {
  try {
    yield call(() => startLoading());
    yield call(() => forgotPassword(payload));

    yield put({
      type: FORGOT_PASSWORD_SUCCESS
    });
  } catch (error) {
    yield put({
      type: FORGOT_PASSWORD_FAILURE,
      payload: { error: error.message }
    });
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

const forgotPassword = ({ email }) =>
  firebase.auth().sendPasswordResetEmail(email);

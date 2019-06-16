import { takeLatest, call, put } from "redux-saga/effects";
import firebase from "firebase";

import { SIGN_UP_REQUEST, SIGN_UP_FAILURE } from "./actions";
import {
  START_LOADING,
  STOP_LOADING
} from "../../../components/loading/actions";
import { post } from "../../../helpers/api-helper";
import { GET_PROFILE_REQUEST } from "../../profile/actions";
import { setAccessToken } from "../../../helpers/oauth-helper";

export function* watcherSignUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, workerSignUpSaga);
}

function* workerSignUpSaga({ payload }) {
  try {
    yield call(() => startLoading());

    // Sign up with firebase.
    const responseSignUp = yield call(() => signUp(payload));

    // Get the user token and set the access token in storage.
    const token = yield call(() => getToken());
    yield call(() => setAccessToken(token));

    const { user } = responseSignUp;
    const { email, displayName, emailVerified, uid } = user;

    // TODO: Uncomment this line.
    // yield call(() => sendEmailVerification(user));
    yield call(() =>
      post("authentication/signup", {
        uid
      })
    );

    yield put({
      type: GET_PROFILE_REQUEST
    });
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user: { email, displayName, emailVerified, uid } }
    });
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

const getToken = () => firebase.auth().currentUser.getIdToken(true);

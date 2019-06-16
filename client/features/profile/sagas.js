import { takeLatest, call, put as sagaPut } from "redux-saga/effects";

import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from "./actions";
import { get, put } from "../../helpers/api-helper";
import { START_LOADING, STOP_LOADING } from "../../components/loading/actions";

export function* watcherGetProfileSaga() {
  yield takeLatest(GET_PROFILE_REQUEST, workerGetProfileSaga);
}

export function* watcherUpdateProfileSaga() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, workerUpdateProfileSaga);
}

function* workerGetProfileSaga() {
  try {
    yield call(() => startLoading());
    const { data } = yield call(() => get("users"));

    yield sagaPut({ type: GET_PROFILE_SUCCESS, payload: { profile: data } });
  } catch (error) {
    yield sagaPut({
      type: GET_PROFILE_FAILURE,
      payload: { error: error.message }
    });
  } finally {
    yield call(() => stopLoading());
  }
}

function* workerUpdateProfileSaga({ payload }) {
  try {
    yield call(() => startLoading());
    const { data } = yield call(() => put("users", payload.profile));
    yield sagaPut({ type: UPDATE_PROFILE_SUCCESS, payload: { profile: data } });
  } catch (error) {
    yield sagaPut({
      type: UPDATE_PROFILE_FAILURE,
      payload: { error: error.message }
    });
  } finally {
    yield call(() => stopLoading());
  }
}

function* startLoading() {
  yield sagaPut({
    type: START_LOADING
  });
}
function* stopLoading() {
  yield sagaPut({
    type: STOP_LOADING
  });
}

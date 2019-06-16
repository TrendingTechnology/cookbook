import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducers";
import rootSaga from "./sagas";

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

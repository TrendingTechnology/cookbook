import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { reducers } from "./reducers";
import sagas from "./sagas";

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(sagas);

  return store;
};

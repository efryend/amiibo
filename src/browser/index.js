import 'babel-polyfill';

import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux';
import reducer from "../shared/utility/Reducer";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchFetchData } from "../shared/utility/Saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchData);

hydrate(
  <Provider store={store}>
	  <BrowserRouter>
	    <App />
	  </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
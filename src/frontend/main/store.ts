import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
const {createLogger} = require('redux-logger')

import reducer from './reducer'

/**
 * Basic Thunk Async Middleware
 */
const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch, store) :
    next(action)

/**
 * Actions and reducer changes logger
 */
const logger = createLogger()

/**
 * Redux Middleware
 */
const middlewares = [thunk, logger]

/**
 * Store creation
 */
export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middlewares)
))

/**
 * Hot reloading
 */
if (module.hot) {
  module.hot.accept('./reducer.ts', () => {
    const nextStore = require('./reducer.ts').default
    store.replaceReducer(nextStore);
  })
}

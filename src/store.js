import thunk from 'redux-thunk';
import getConfig from 'next/config';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './rootReducer';

const { publicRuntimeConfig } = getConfig();

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

const API_END_POINT = publicRuntimeConfig.APP_API;
const globalOptional = {};

const initializeStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ API_END_POINT, globalOptional })))
  );
};

const getOrCreateStore = initialState => {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
};

export { getOrCreateStore };
export default initializeStore;

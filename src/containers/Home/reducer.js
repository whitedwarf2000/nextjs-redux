import produce from 'immer';

import { FETCH_HOME, FETCH_HOME_SUCCESS, FETCH_HOME_FAIL } from './actionTypes';

export const initialState = {
  isLoading: false,
  homeData: {
    title: '',
  },
  error: null,
};

const home = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_HOME:
        draft.isLoading = true;

        break;
      case FETCH_HOME_SUCCESS:
        draft.homeData = action.homeData;
        draft.isLoading = false;

        break;
      case FETCH_HOME_FAIL:
        draft.isLoading = false;
        draft.error = action.error;

        break;
    }
  });

export default home;

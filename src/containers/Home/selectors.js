import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHomeState = state => state.home || initialState;

const makeSelectHomeData = createSelector(selectHomeState, homeState => homeState.homeData);
const selectHomeData = createSelector(makeSelectHomeData, homeData => homeData);

const makeSelectHomeLoading = createSelector(
  selectHomeState,
  hotContentState => hotContentState.isLoading
);
const selectHomeLoading = createSelector(makeSelectHomeLoading, isLoading => isLoading);

export { selectHomeLoading, selectHomeData };

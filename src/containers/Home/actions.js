import { FETCH_HOME, FETCH_HOME_SUCCESS, FETCH_HOME_FAIL } from './actionTypes';

import { COMMON_ERROR_MESSAGE } from 'constants.js';

export const fetchHome = () => ({
  type: FETCH_HOME,
});

export const fetchHomeSuccess = homeData => ({
  type: FETCH_HOME_SUCCESS,
  homeData,
});

export const fetchHomeFail = error => ({
  type: FETCH_HOME_FAIL,
  error,
});

const fakeGetData = () =>
  new Promise(resolve => {
    return setTimeout(
      () =>
        resolve({
          title: 'Base Next js with Redux',
        }),
      1000
    );
  });

export const fetchHomeRequest = () => async dispatch => {
  dispatch(fetchHome());

  try {
    const response = await fakeGetData();

    if (response) {
      dispatch(fetchHomeSuccess(response));
    } else {
      dispatch(fetchHomeFail(COMMON_ERROR_MESSAGE));
    }

    return response;
  } catch (error) {
    dispatch(fetchHomeFail(error));
  }
};

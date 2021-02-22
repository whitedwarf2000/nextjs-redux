import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectHomeData, selectHomeLoading } from './selectors';
import { fetchHomeRequest, fetchHomeSuccess } from './actions';

export const useHome = () => {
  const homeData = useSelector(selectHomeData);
  const isLoading = useSelector(selectHomeLoading);

  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators({ fetchHomeRequest, fetchHomeSuccess }, dispatch),
    [dispatch]
  );

  return useMemo(
    () => ({
      actions,
      homeData,
      isLoading,
    }),
    [actions, homeData, isLoading]
  );
};

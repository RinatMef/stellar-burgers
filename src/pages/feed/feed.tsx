import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFeeds,
  selectFeed,
  selectFeedsState,
  selectIsLoading
} from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  /** Данные из стора */
  const orders = useSelector(selectFeed);
  const isLoading = useSelector(selectIsLoading);

  if (!orders.length) {
    return <Preloader />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};

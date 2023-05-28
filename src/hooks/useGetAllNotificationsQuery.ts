import greenApiService from '@/services/green-api.service';
import { UseQueryOptions, useQuery } from 'react-query';

type TQueryFnData = Awaited<
  ReturnType<(typeof greenApiService)['getAllNotifications']>
>;

type UseGetAllNotificationsQueryOptions = UseQueryOptions<
  TQueryFnData,
  unknown,
  TQueryFnData,
  typeof USE_GET_ALL_NOTIFICATIONS_QUERY_KEY
>;

export const USE_GET_ALL_NOTIFICATIONS_QUERY_KEY =
  'USE_GET_ALL_NOTIFICATIONS_QUERY_KEY';

const useGetAllNotificationsQuery = (
  options?: UseGetAllNotificationsQueryOptions,
) =>
  useQuery(
    USE_GET_ALL_NOTIFICATIONS_QUERY_KEY,
    () => greenApiService.getAllNotifications(),
    options,
  );

export default useGetAllNotificationsQuery;

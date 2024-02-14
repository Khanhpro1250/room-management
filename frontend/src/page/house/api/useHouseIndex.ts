import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';
import { HOUSE_INDEX_API } from './house.api';

export const getHouseIndex = async (): Promise<AxiosResponse<ApiResponse<any>>> => {
    return requestApi('get', HOUSE_INDEX_API);
};

type QueryFnType = typeof getHouseIndex;

type UseHouseIndex = QueryConfig<QueryFnType>;

export const useHouseIndex = (config?: UseHouseIndex) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['INDEX_HOUSE'],
        queryFn: () => getHouseIndex(),
        ...config,
    });
};

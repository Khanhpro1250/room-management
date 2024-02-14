import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';
import { ComboOption } from '~/types/shared';
import { HOUSE_COMBO_API } from './house.api';

export const getHouseCombo = async ({
    signal,
}: {
    signal: AbortSignal | undefined;
}): Promise<AxiosResponse<ApiResponse<ComboOption[]>>> => {
    return requestApi('get', HOUSE_COMBO_API, { signal });
};

type QueryFnType = typeof getHouseCombo;

type UseHouseCombo = QueryConfig<QueryFnType>;

export const useHouseCombo = (config?: UseHouseCombo) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['COMBO_HOUSE'],
        queryFn: ({ signal }) => getHouseCombo({ signal }),
        ...config,
    });
};

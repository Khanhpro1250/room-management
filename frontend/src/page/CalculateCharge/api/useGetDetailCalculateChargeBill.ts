import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';
import { CalculateChargeDetailBillDto } from '../types/calculate';
import { DETAIL_CALCULATE_CHARGE } from './calculate.api';

export const getGetDetailCalculateChargeBill = async ({
    id,
    signal,
}: {
    id: string | null;
    signal: AbortSignal | undefined;
}): Promise<AxiosResponse<ApiResponse<CalculateChargeDetailBillDto>>> => {
    return requestApi('get', `${DETAIL_CALCULATE_CHARGE}/${id}`, { signal });
};

type QueryFnType = typeof getGetDetailCalculateChargeBill;

type UseGetDetailCalculateChargeBill = QueryConfig<QueryFnType>;

export const useGetDetailCalculateChargeBill = (id: string | null, config?: UseGetDetailCalculateChargeBill) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['DETAIL_CALCULATE_CHARGE', id],
        queryFn: ({ signal }) => getGetDetailCalculateChargeBill({ signal, id }),
        ...config,
    });
};

import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';

export const getReportTotalSpentAmount = async ({
    filter,
    signal,
}: {
    filter: Record<string, any>;
    signal: AbortSignal | undefined;
}): Promise<AxiosResponse<ApiResponse<any>>> => {
    return requestApi('get', 'api/report/total-spend-amount', { ...filter });
};

type QueryFnType = typeof getReportTotalSpentAmount;

type ReportTotalSpentAmount = QueryConfig<QueryFnType>;

export const useReportTotalSpentAmount = (filter: Record<string, any>, config?: ReportTotalSpentAmount) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['TOTAL_AMOUNT_SPEND_REPORT', filter],
        queryFn: ({ signal }) => getReportTotalSpentAmount({ filter, signal }),
        ...config,
    });
};

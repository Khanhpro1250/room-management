import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';

export const getReportRevenue = async ({
    filter,
    signal,
}: {
    filter: Record<string, any>;
    signal: AbortSignal | undefined;
}): Promise<AxiosResponse<ApiResponse<any>>> => {
    return requestApi('get', 'api/report/room-revenue', { ...filter });
};

type QueryFnType = typeof getReportRevenue;

type ReportRevenue = QueryConfig<QueryFnType>;

export const useReportRevenue = (filter: Record<string, any>, config?: ReportRevenue) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['REVENUE_REPORT', filter],
        queryFn: ({ signal }) => getReportRevenue({ filter, signal }),
        ...config,
    });
};

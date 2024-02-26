import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';

export const getReportRevenue = async ({
    signal,
}: {
    signal: AbortSignal | undefined;
}): Promise<AxiosResponse<ApiResponse<any>>> => {
    return requestApi('get', 'api/report/room-revenue', { signal });
};

type QueryFnType = typeof getReportRevenue;

type ReportRevenue = QueryConfig<QueryFnType>;

export const useReportRevenue = (config?: ReportRevenue) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['REVENUE_REPORT'],
        queryFn: ({ signal }) => getReportRevenue({ signal }),
        ...config,
    });
};

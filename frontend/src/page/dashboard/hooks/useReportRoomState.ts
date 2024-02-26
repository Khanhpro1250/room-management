import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';

export const getReportRoomState = async ({
    signal,
}: {
    signal: AbortSignal | undefined;
}): Promise<AxiosResponse<ApiResponse<any>>> => {
    return requestApi('get', 'api/report/room-state', { signal });
};

type QueryFnType = typeof getReportRoomState;

type ReportRoomState = QueryConfig<QueryFnType>;

export const useReportRoomState = (config?: ReportRoomState) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['ROOM_STATE_REPORT'],
        queryFn: ({ signal }) => getReportRoomState({ signal }),
        ...config,
    });
};

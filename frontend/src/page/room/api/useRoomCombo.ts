import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';
import { ComboOption } from '~/types/shared';
import { ROOM_COMBO_API } from './room.api';

export const getRoomCombo = async ({
    houseId,
    params,
    signal,
}: {
    houseId?: string;
    params?: Record<string, any>;
    signal: AbortSignal | undefined;
}): Promise<
    AxiosResponse<
        ApiResponse<
            {
                value: string;
                label: string;
                houseId: string;
            }[]
        >
    >
> => {
    return requestApi('get', ROOM_COMBO_API, { houseId, ...params, signal });
};

type QueryFnType = typeof getRoomCombo;

type UseRoomCombo = QueryConfig<QueryFnType>;

export const useRoomCombo = (houseId?: string, params?: Record<string, any>, config?: UseRoomCombo) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['COMBO_ROOM', houseId, params],
        queryFn: ({ signal }) => getRoomCombo({ houseId, params, signal }),
        ...config,
    });
};

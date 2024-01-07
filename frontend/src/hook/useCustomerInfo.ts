import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

import { ApiResponse, requestApi } from '~/lib/axios';
import { DATA_WITH_ROOM_API } from '~/page/room/api/room.api';
import { Room } from '~/types/shared';
import { Customer, Member } from '~/types/shared/Customer';
import { Contract } from '~/types/shared/Contract';
import { Service, ServiceCustomer } from '~/types/shared/Service';

export const getCustomerInfo = async ({
    roomId,
    signal,
}: {
    roomId: string | null;
    signal: AbortSignal | undefined;
}): Promise<
    AxiosResponse<
        ApiResponse<{
            room: Room;
            customer: Customer;
            contract: Contract;
            listServices: Service[];
            services: ServiceCustomer[];
            members: Member[];
        }>
    >
> => {
    return requestApi(
        'get',
        DATA_WITH_ROOM_API,
        {
            roomId: roomId,
        },
        { signal },
    );
};

type QueryFnType = typeof getCustomerInfo;

type UseCustomerInfo = QueryConfig<QueryFnType>;

export const useCustomerInfo = (roomId: string | null, config?: UseCustomerInfo) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        queryKey: ['DATA_WITH_ROOM', roomId],
        queryFn: ({ signal }) => getCustomerInfo({ signal, roomId }),
        ...config,
    });
};

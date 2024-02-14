import { useSelector } from 'react-redux';
import { RootState } from '~/AppStore';
import { PaginatedList, ResultResponse, requestApi } from '~/lib/axios';
import { Authorization } from '~/types/shared';

export interface PaginatedListQuery {
    offset: number;
    limit: number;
}
export const gridDataSourceService = async (
    params: PaginatedListQuery,
    url: string,
): Promise<ResultResponse<PaginatedList<any>>> => {
    const { authUser } = useSelector((state: RootState) => state.authData);
    const response = await requestApi<PaginatedList<any>>(
        'get',
        url,
        {},
        { params: { ...params }, headers: { [Authorization]: authUser?.token ?? '' } },
    );
    console.log('response', response);
    return response;
};

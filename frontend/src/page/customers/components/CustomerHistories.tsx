import React, { useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import { CUSTOMER_HISTORIES_API } from '../api/customer.api';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { RoomProcessGridDto } from '~/types/shared';
import { Status } from '~/component/Grid/Components/Status';

interface Props {
    onClose: () => void;
    customerId: string;
}
const CustomerHistories: React.FC<Props> = props => {
    const gridRef = useRef<BaseGridRef>(null);
    const gridController = useBaseGrid<Service>({
        url: `${CUSTOMER_HISTORIES_API}/${props.customerId}`,
        gridRef: gridRef,
    });

    const CustomerHistoriesColumnDefs: BaseGridColDef[] = [
        {
            headerName: 'Họ và tên',
            field: nameof.full<RoomProcessGridDto>(x => x.customerName),
            width: 250,
        },
        {
            headerName: 'Nhà',
            field: nameof.full<RoomProcessGridDto>(x => x.houseName),
            minWidth: 200,
        },
        {
            headerName: 'Phòng',
            field: nameof.full<RoomProcessGridDto>(x => x.roomCode),
            width: 100,
        },
        {
            headerName: 'Hành động',
            field: nameof.full<RoomProcessGridDto>(x => x.actionName),
            width: 100,
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return <Status status={params.data.action} statusName={params.data.actionName} />;
            },
        },
        {
            headerName: 'Thời gian',
            field: nameof.full<RoomProcessGridDto>(x => x.createdTime),
            minWidth: 100,
            valueFormatter: params => (params.value ? moment(params.value).format('DD/MM/YYYY HH:mm') : ''),
            flex: 1,
        },
    ];

    return (
        <AppModalContainer className="!p-0" loading={gridController?.loading}>
            <BaseGrid
                columnDefs={CustomerHistoriesColumnDefs}
                data={gridController?.data || []}
                ref={gridRef}
                numberRows={true}
                pagination={false}
                actionRows={false}
            />
            <div className="flex items-center justify-center w-full">
                <ButtonBase title="Đóng" size="md" startIcon={faClose} variant="danger" onClick={props.onClose} />
            </div>
        </AppModalContainer>
    );
};

export default CustomerHistories;

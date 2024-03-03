import React, { useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import { CUSTOMER_HISTORIES_API, CUSTOMER_PAYMENT_HISTORIES_API } from '../api/customer.api';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { RoomProcessGridDto } from '~/types/shared';
import { Status } from '~/component/Grid/Components/Status';

interface Props {
    onClose: () => void;
    customerId: string;
}
const CustomerPaymentHistory: React.FC<Props> = props => {
    const gridRef = useRef<BaseGridRef>(null);
    const gridController = useBaseGrid<Service>({
        url: `${CUSTOMER_PAYMENT_HISTORIES_API}/${props.customerId}`,
        gridRef: gridRef,
    });

    const CustomerPaymentHistoryColumnDefs: BaseGridColDef[] = [
        {
            headerName: 'Họ và tên',
            field: 'customerName',
            width: 250,
        },
        {
            headerName: 'Thời gian',
            field: 'createdTime',
            minWidth: 200,
            valueFormatter: params => (params.value ? moment(params.value).format('DD/MM/YYYY') : ''),
            flex: 1,
        },
        {
            headerName: 'Số tiền',
            field: 'amount',
            minWidth: 200,
            cellStyle: { textAlign: 'right' },
            width: 200,
            cellRenderer: (val: any) => {
                return val.value
                    ? `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(val.value)}`
                    : 0;
            },
        },
        {
            headerName: 'Mô tả',
            field: 'description',
            minWidth: 400,
        },
    ];

    return (
        <AppModalContainer className="!p-0" loading={gridController?.loading}>
            <BaseGrid
                columnDefs={CustomerPaymentHistoryColumnDefs}
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

export default CustomerPaymentHistory;

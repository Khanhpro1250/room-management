import React, { useImperativeHandle, useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import Loading from '~/component/Elements/loading/Loading';
import { CUSTOMER_HISTORIES_LIST_API } from '../api/customer.api';
import { CustomerListViewDto } from '../types/customer';

export interface ListCustomerHistoriesRef {
    getRoweData: () => any;
}
interface Props {
    onGetData: () => void;
    onClose: () => void;
}
const ListCustomerHistories = React.forwardRef<ListCustomerHistoriesRef, Props>((props, ref): JSX.Element => {
    const gridRef = useRef<BaseGridRef>(null);

    const gridController = useBaseGrid<Service>({
        url: CUSTOMER_HISTORIES_LIST_API,
        gridRef: gridRef,
    });

    useImperativeHandle(
        ref,
        () => ({
            getRoweData: () => {
                return gridRef.current?.api.getSelectedRows()[0];
            },
        }),
        [],
    );

    const ListCustomerHistoriesColumnDefs: BaseGridColDef[] = [
        {
            headerName: 'Họ và tên',
            field: nameof.full<CustomerListViewDto>(x => x.fullName),
            minWidth: 250,
            checkboxSelection: true,
        },
        {
            headerName: 'Số điện thoại',
            field: nameof.full<CustomerListViewDto>(x => x.phoneNumber1),
            width: 200,
        },
        {
            headerName: 'Email',
            field: nameof.full<CustomerListViewDto>(x => x.email),
            width: 200,
        },
        {
            headerName: 'Địa chỉ',
            field: nameof.full<CustomerListViewDto>(x => x.permanentAddress),
            flex: 1,
            minWidth: 250,
        },
    ];
    if (gridController?.loading) return <Loading />;

    return (
        <>
            <BaseGrid
                columnDefs={ListCustomerHistoriesColumnDefs}
                data={gridController?.data || []}
                rowSelection="single"
                ref={gridRef}
                actionRows={false}
                reloadData={gridController?.reloadData}
            />
            <div className="flex items-center justify-center w-full">
                <ButtonBase title="Lưu" size="md" startIcon={faSave} variant="primary" onClick={props.onGetData} />
                <ButtonBase title="Đóng" size="md" startIcon={faClose} variant="danger" onClick={props.onClose} />
            </div>
        </>
    );
});

export default ListCustomerHistories;

import React, { useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef, IActionRows } from '~/component/Grid/BaseGrid';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFileExport, faHistory, faSync, faTrash, faUserEdit, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { BaseFormRef } from '~/component/Form/BaseForm';
import { Status } from '~/component/Grid/Components/Status';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { CUSTOMER_DELETE_API, CUSTOMER_INDEX_API } from './api/customer.api';
import CustomerHistories from './components/CustomerHistories';
import CustomerPaymentHistory from './components/CustomerPaymentHistory';
import { CustomerListViewDto } from './types/customer';
import { RowNode } from 'ag-grid-community';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';

const CustomerListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const formRef = useRef<BaseFormRef>(null);
    const navigate = useNavigate();
    const gridController = useBaseGrid<Service>({
        url: CUSTOMER_INDEX_API,
        gridRef: gridRef,
    });

    const CustomerListViewColumnDefs: BaseGridColDef[] = [
        {
            headerName: 'Họ và tên',
            field: nameof.full<CustomerListViewDto>(x => x.fullName),
            minWidth: 250,
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
        {
            headerName: 'Trạng thái',
            field: nameof.full<CustomerListViewDto>(x => x.status),
            // minWidth: 120,
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return <Status status={params.value} statusName={params.data.statusName} />;
            },
        },
    ];

    const getActionRows = (): Array<IActionRows> => {
        return [
            {
                startIcon: faUserEdit,
                tooltip: 'Chỉnh sửa khách thuê',
                isHidden(data) {
                    return data.status === 'Rented';
                },
                onClick: (data: any, rowNode?: RowNode) => {
                    navigate(`/customer?roomId=${data.roomId}`);
                },
            },
            {
                startIcon: faSync,
                variant: 'info',
                tooltip: 'Lịch sử thuê phòng',
                isHidden(data) {
                    return data.status === 'NotRented';
                },
                onClick: data => {
                    modalRef.current?.onOpen(
                        <CustomerHistories customerId={data.id} onClose={modalRef.current.onClose} />,
                        'Lịch sử thuê phòng',
                        '60%',
                        icon(faSync),
                    );
                },
            },
            {
                startIcon: faHistory,
                variant: 'warning',
                tooltip: 'Lịch sử thanh toán',
                isHidden(data) {
                    return data.status === 'NotRented';
                },
                onClick: data => {
                    modalRef.current?.onOpen(
                        <CustomerPaymentHistory customerId={data.id} onClose={modalRef.current.onClose} />,
                        'Lịch thanh toán',
                        '60%',
                        icon(faHistory),
                    );
                },
            },
            {
                startIcon: faTrash,
                variant: 'danger',
                tooltip: 'Xóa',
                isConfirm: true,
                isHidden(data) {
                    return data.status !== 'NotRented';
                },
                onClick: onDelete,
            },
        ];
    };

    const onDelete = async (data: any) => {
        const res = await requestApi('delete', `${CUSTOMER_DELETE_API}/${data.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
            gridController?.reloadData();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
            return;
        }
    };

    const onExport = () => {
        gridRef.current?.api.exportDataAsExcel({
            fileName: 'Danh khách thuê',
            sheetName: 'Danh khách thuê',
        });
    };

    const renderTitle = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div
                        className={
                            'text-sm inline-flex items-center font-bold leading-sm ' +
                            'uppercase px-[8px] py-[5px] bg-[#73737320] text-[#737373] rounded-md mr-1'
                        }
                    >
                        <BaseIcon icon={faUserGroup} />
                    </div>
                    <span className="font-semibold text-lg">Khách thuê</span>
                </div>
                <ButtonBase
                    variant="warning"
                    title="Xuất dữ liệu"
                    size="md"
                    startIcon={faFileExport}
                    onClick={onExport}
                />
            </div>
        );
    };

    return (
        <AppContainer title={renderTitle()} loading={gridController?.loading}>
            <BaseGrid
                columnDefs={CustomerListViewColumnDefs}
                data={gridController?.data || []}
                ref={gridRef}
                numberRows={true}
                pagination={true}
                actionRows={false}
                reloadData={gridController?.reloadData}
                actionRowsReRender={getActionRows()}
            />

            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default CustomerListView;

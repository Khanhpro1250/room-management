import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useRef } from 'react';
import Loading from '~/component/Elements/loading/Loading';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { icon } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { baseDeleteApi, requestApi } from '~/lib/axios';
import NotificationConstant from '~/configs/contants';
import NotifyUtil from '~/util/NotifyUtil';
import { LIST_ROOM_FOR_CREATE_ELECTRIC } from './api/electric-service.api';

const ElectricServiceListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridController = useBaseGrid<Service>({
        url: LIST_ROOM_FOR_CREATE_ELECTRIC,
        gridRef: gridRef,
    });

    const onCreate = () => {
        // modalRef.current?.onOpen(
        //     <ServicesForm
        //         onSubmitSuccessfully={() => {
        //             modalRef.current?.onClose();
        //             gridController?.reloadData();
        //         }}
        //         onClose={modalRef.current?.onClose}
        //     />,
        //     'Tạo mới dịch vụ',
        //     '50%',
        // );
    };

    const onUpdate = (data: Service) => {
        // modalRef.current?.onOpen(
        //     <ServicesForm
        //         onSubmitSuccessfully={() => {
        //             modalRef.current?.onClose();
        //             gridController?.reloadData();
        //         }}
        //         onClose={modalRef.current?.onClose}
        //         initialValues={data}
        //     />,
        //     'Cập nhật dịch vụ',
        //     '50%',
        //     icon(faEdit),
        // );
    };

    const onDelete = async (data: Service) => {
        // const res = await requestApi('delete', `${SERVICE_DELETE_API}/${data.id}`);
        // if (res.data?.success) {
        //     NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
        //     gridController?.reloadData();
        //     return;
        // } else {
        //     NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
        //     return;
        // }
    };

    const ElectricServiceColDefs: BaseGridColDef[] = [
        {
            headerName: 'Tên',
            field: nameof.full<Service>(x => x.name),
        },
        {
            headerName: 'Loại dịch vụ',
            field: nameof.full<Service>(x => x.type),
        },
        {
            headerName: 'Đơn giá',
            field: nameof.full<Service>(x => x.price),

            cellStyle: { textAlign: 'right' },
            cellRenderer: (val: any) => {
                return Number(val.value ?? 0).toLocaleString('vi', { maximumSignificantDigits: 2 });
            },
        },
        {
            headerName: 'Đơn vị tính',
            field: nameof.full<Service>(x => x.unit),
        },
        {
            headerName: 'Trạng thái',
            field: nameof.full<Service>(x => x.status),

            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return <Checkbox value={params.value} disabled checked={params.value} />;
            },
        },
    ];

    return (
        <AppContainer>
            {gridController?.loading ? (
                <Loading />
            ) : (
                <>
                    <BaseGrid
                        columnDefs={ElectricServiceColDefs}
                        data={gridController?.data || []}
                        ref={gridRef}
                        numberRows={false}
                        pagination={false}
                        actionRowsList={{
                            hasEditBtn: true,
                            hasDeleteBtn: true,
                            hasCreateChildBtn: true,
                            // onClickCreateChildBtn: onCreateChild,
                            onClickEditBtn: onUpdate,
                            onClickDeleteBtn: onDelete,
                        }}
                        actionRowsWidth={120}
                    >
                        <GridToolbar
                            hasCreateButton
                            hasRefreshButton
                            onClickCreateButton={onCreate}
                            // onClickRefreshButton={() => gridController?.reloadData()}
                        />
                    </BaseGrid>
                    <ModalBase ref={modalRef} />
                </>
            )}
        </AppContainer>
    );
};

export default ElectricServiceListView;

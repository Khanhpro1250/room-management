import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCubes, faEdit } from '@fortawesome/free-solid-svg-icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useRef } from 'react';
import Loading from '~/component/Elements/loading/Loading';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import NotificationConstant from '~/configs/contants';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { requestApi } from '~/lib/axios';
import { Service } from '~/types/shared/Service';
import NotifyUtil from '~/util/NotifyUtil';
import { SERVICE_DELETE_API, SERVICE_INDEX_API } from './api/services.api';
import ServicesForm from './components/ServicesForm';

const ServicesListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridController = useBaseGrid<Service>({
        url: SERVICE_INDEX_API,
        gridRef: gridRef,
    });

    const onCreate = () => {
        modalRef.current?.onOpen(
            <ServicesForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
            />,
            'Tạo mới dịch vụ',
            '50%',
        );
    };

    const onUpdate = (data: Service) => {
        modalRef.current?.onOpen(
            <ServicesForm
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
                initialValues={data}
            />,
            'Cập nhật dịch vụ',
            '50%',
            icon(faEdit),
        );
    };

    const onDelete = async (data: Service) => {
        const res = await requestApi('delete', `${SERVICE_DELETE_API}/${data.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
            gridController?.reloadData();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
            return;
        }
    };

    const ServiceColDefs: BaseGridColDef[] = [
        {
            headerName: 'Tên',
            field: nameof.full<Service>(x => x.name),
            minWidth: 500,
            flex: 1,
        },
        {
            headerName: 'Loại dịch vụ',
            field: nameof.full<Service>(x => x.type),
            width: 120,
        },
        {
            headerName: 'Đơn giá',
            field: nameof.full<Service>(x => x.price),
            width: 120,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (val: any) => {
                return Number(val.value ?? 0).toLocaleString('vi', { maximumFractionDigits: 2 });
            },
        },
        {
            headerName: 'Đơn vị tính',
            field: nameof.full<Service>(x => x.unit),
            width: 120,
            valueFormatter: (params: any) => {
                const unit = JSON.parse(params.value);
                return unit;
            },
        },
        {
            headerName: 'Trạng thái',
            field: nameof.full<Service>(x => x.status),
            width: 120,
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return <Checkbox value={params.value} disabled checked={params.value} />;
            },
        },
    ];

    const renderTitle = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <div>
                    <div
                        className={
                            'text-sm inline-flex items-center font-bold leading-sm ' +
                            'uppercase px-[8px] py-[5px] bg-[#73737320] text-[#737373] rounded-md mr-1'
                        }
                    >
                        <BaseIcon icon={faCubes} />
                    </div>
                    <span className="font-semibold text-lg">Dịch vụ</span>
                </div>
                <GridToolbar
                    hasCreateButton
                    hasRefreshButton
                    onClickCreateButton={onCreate}
                    // onClickRefreshButton={() => gridController?.reloadData()}
                />
            </div>
        );
    };

    return (
        <AppContainer loading={gridController?.loading} title={renderTitle()}>
            <BaseGrid
                columnDefs={ServiceColDefs}
                data={gridController?.data || []}
                ref={gridRef}
                numberRows={false}
                pagination={false}
                actionRowsList={{
                    hasEditBtn: true,
                    hasDeleteBtn: true,
                    onClickEditBtn: onUpdate,
                    onClickDeleteBtn: onDelete,
                }}
                actionRowsWidth={120}
            />

            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default ServicesListView;

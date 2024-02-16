import React, { useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef, IActionRows } from '~/component/Grid/BaseGrid';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { faSave, faSync, faTrash, faUserEdit, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { RowNode } from 'ag-grid';
import { DatePicker, Select } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Fieldset } from '~/component/Elements/FieldSet/FieldSet';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { Status } from '~/component/Grid/Components/Status';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import { CUSTOMER_DELETE_API, CUSTOMER_INDEX_API } from './api/customer.api';
import { CustomerListViewDto } from './types/customer';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import NotificationConstant from '~/configs/contants';
import CustomerHistories from './components/CustomerHistories';
import { icon } from '@fortawesome/fontawesome-svg-core';

const CustomerListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const formRef = useRef<BaseFormRef>(null);
    const navigate = useNavigate();
    const gridController = useBaseGrid<Service>({
        url: CUSTOMER_INDEX_API,
        // params: {
        //     month: moment().month() + 1,
        //     year: moment().year(),
        //     serviceType: ServiceType.Water,
        // },
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
                        '50%',
                        icon(faSync),
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

    const handleChangeData = debounce((val: any) => {
        console.log(val);
    }, 300);

    const renderTitle = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
        );
    };

    return (
        <AppContainer title={renderTitle()} loading={gridController?.loading}>
            <Fieldset title="Bộ lọc tìm kiếm">
                <BaseForm
                    ref={formRef}
                    className="mb-2 w-full"
                    baseFormItem={[
                        {
                            label: 'Tháng/năm',
                            name: 'dataTime',
                            children: (
                                <DatePicker
                                    onChange={handleChangeData}
                                    className="w-full"
                                    format={'MM/yyyy'}
                                    picker="month"
                                    defaultValue={moment()}
                                />
                            ),
                            className: 'col-span-4',
                        },
                        {
                            label: 'Nhà',
                            name: 'houseId',
                            // children: <Select onChange={handleChangeData} options={houseCombo} />,
                            className: 'col-span-4',
                        },
                        {
                            label: 'Trạng thái',
                            name: 'status',
                            children: (
                                <Select
                                    clearIcon
                                    onChange={handleChangeData}
                                    options={[
                                        {
                                            value: 'ALL',
                                            label: 'Tất cả',
                                        },
                                        {
                                            value: 'NEW',
                                            label: 'Còn trống',
                                        },
                                        {
                                            value: 'RENTED',
                                            label: 'Đã cho thuê',
                                        },
                                    ]}
                                    defaultValue={'ALL'}
                                    showSearch
                                    allowClear
                                    placeholder="Chọn trạng thái..."
                                />
                            ),
                            className: 'col-span-4',
                        },
                    ]}
                    labelAlign="left"
                    labelCol={2}
                    isDisplayGrid={true}
                />
            </Fieldset>

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

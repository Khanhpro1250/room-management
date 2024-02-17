import React, { useMemo, useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef, IActionRows } from '~/component/Grid/BaseGrid';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { faEdit, faMagic, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input, Select } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import { Fieldset } from '~/component/Elements/FieldSet/FieldSet';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { useHouseCombo } from '../house/api/useHouseCombo';
import { DELETE_INCURRED_API, INDEX_INCURRED_API } from './api/electric-service.api';
import IncurredCostForm from './components/IncurredCostForm';
import { IncurredCostGrid, IncurredCostType, ServiceType } from './type/electic-service';

const { RangePicker } = DatePicker;

const IncurredCostListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const formRef = useRef<BaseFormRef>(null);
    const gridController = useBaseGrid<Service>({
        url: INDEX_INCURRED_API,
        gridRef: gridRef,
    });

    const { data: houseComboResponse, isFetching: isLoadingHouseCombo } = useHouseCombo(true);

    const houseCombo = useMemo(() => houseComboResponse?.data?.result ?? [], [isLoadingHouseCombo]);

    const IncurredCostColDefs: BaseGridColDef[] = [
        {
            headerName: 'Thời gian',
            field: nameof.full<IncurredCostGrid>(x => x.date),
            width: 100,
            cellRenderer: (val: any) => {
                return moment(val.value).format('MM/YYYY');
            },
        },
        {
            headerName: 'Nhà',
            field: nameof.full<IncurredCostGrid>(x => x.houseName),
            width: 200,
        },
        {
            headerName: 'Phòng',
            field: nameof.full<IncurredCostGrid>(x => x.roomCode),
            width: 200,
        },
        {
            headerName: 'Người chi trả',
            field: nameof.full<IncurredCostGrid>(x => x.type),
            width: 150,
            cellRenderer: (val: any) => {
                return val.value === IncurredCostType.Owner ? 'Chủ nhà' : 'Khách thuê';
            },
        },
        {
            headerName: 'Mô tă',
            field: nameof.full<IncurredCostGrid>(x => x.description),
            minWidth: 200,
            flex: 1,
        },
        {
            headerName: 'Số tiền (VNĐ)',
            field: nameof.full<IncurredCostGrid>(x => x.cost),
            cellStyle: { textAlign: 'right' },
            width: 200,
            cellRenderer: (val: any) => {
                return val.value
                    ? `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(val.value)}`
                    : '';
            },
        },
    ];

    const handleChangeData = debounce(() => {
        const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
        gridController?.setParams({
            ...formValues,
            fromDate: formValues.currentDate?.[0]?.format('YYYY-MM-DD'),
            toDate: formValues.currentDate?.[1]?.format('YYYY-MM-DD'),
            serviceType: ServiceType.Water,
        });
        gridController?.reloadData();
    }, 300);

    const onCreate = () => {
        modalRef.current?.onOpen(
            <IncurredCostForm
                houseCombo={houseCombo}
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
            />,
            'Tạo mới chi phí phát sinh',
            '50%',
        );
    };

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
                        <BaseIcon icon={faMagic} />
                    </div>
                    <span className="font-semibold text-lg">Chi phí phát sinh</span>
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

    const onDelete = async (data: any) => {
        const res = await requestApi('delete', `${DELETE_INCURRED_API}/${data.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
            gridController?.reloadData();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
            return;
        }
    };

    const getActionRows = (): Array<IActionRows> => {
        return [
            {
                startIcon: faEdit,
                tooltip: 'Chỉnh sửa chi phí phát sinh',
                onClick: data => {
                    modalRef.current?.onOpen(
                        <IncurredCostForm
                            houseCombo={houseCombo}
                            initialValues={data}
                            id={data.id}
                            onSubmitSuccessfully={() => {
                                modalRef.current?.onClose();
                                gridController?.reloadData();
                            }}
                            onClose={modalRef.current?.onClose}
                        />,
                        'Chỉnh sửa chi phí phát sinh',
                        '50%',
                    );
                },
            },
            {
                startIcon: faTrash,
                variant: 'danger',
                tooltip: 'Xóa',
                isConfirm: true,
                onClick: onDelete,
            },
        ];
    };

    return (
        <AppContainer title={renderTitle()} loading={gridController?.loading || isLoadingHouseCombo}>
            <Fieldset title="Bộ lọc tìm kiếm">
                <BaseForm
                    ref={formRef}
                    className="mb-2 w-full"
                    baseFormItem={[
                        {
                            label: 'Tháng/năm',
                            name: 'currentDate',
                            children: (
                                <RangePicker
                                    onChange={handleChangeData}
                                    className="w-full"
                                    format={'MM/yyyy'}
                                    picker="month"
                                />
                            ),
                            className: 'col-span-4',
                        },
                        {
                            label: 'Nhà',
                            name: 'houseId',
                            children: (
                                <Select
                                    onChange={handleChangeData}
                                    defaultValue={null}
                                    options={[
                                        {
                                            value: null,
                                            label: 'Tất cả',
                                        },
                                        ...houseCombo,
                                    ]}
                                />
                            ),
                            className: 'col-span-4',
                        },
                        {
                            label: 'Mã phòng',
                            name: 'roomCode',
                            children: <Input onChange={handleChangeData} placeholder="Nhập mã phòng ..." />,
                            className: 'col-span-4',
                        },
                    ]}
                    labelAlign="left"
                    labelCol={2}
                    isDisplayGrid={true}
                />
            </Fieldset>

            <BaseGrid
                columnDefs={IncurredCostColDefs}
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

export default IncurredCostListView;

import React, { useMemo, useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef, IActionRows } from '~/component/Grid/BaseGrid';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import {
    faCalculator,
    faEye,
    faFileExport,
    faMagic,
    faMoneyBill,
    faPrint,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input, Select } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import { Fieldset } from '~/component/Elements/FieldSet/FieldSet';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import { useHouseCombo } from '../house/api/useHouseCombo';
import { DELETE_CALCULATE_CHARGE, EXPORT_CALCULATE_CHARGE, INDEX_CALCULATE_CHARGE } from './api/calculate.api';
import { CalculateChargeGrid } from './types/calculate';
import CalculateMoneyForm from './components/CalculateMoneyForm';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { icon } from '@fortawesome/fontawesome-svg-core';
import CollectMoneyForm from './components/CollectMoneyForm';
import ViewCalculateMoneyBill from './components/ViewCalculateMoneyBill';
import { requestApi } from '~/lib/axios';
import NotificationConstant from '~/configs/contants';
import NotifyUtil from '~/util/NotifyUtil';
import FileUtil from '~/util/FileUtil';

import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';

const { RangePicker } = DatePicker;

const CalculateChargeListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const modalViewRef = useRef<ModalRef>(null);
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
    const gridController = useBaseGrid<Service>({
        url: INDEX_CALCULATE_CHARGE,
        params: {
            dateTime: moment().startOf('month').format('YYYY-MM-DD'),
        },
        gridRef: gridRef,
    });

    const { data: houseComboResponse, isFetching: isLoadingHouseCombo } = useHouseCombo(true);

    const houseCombo = useMemo(() => houseComboResponse?.data?.result ?? [], [isLoadingHouseCombo]);

    const IncurredCostColDefs: BaseGridColDef[] = [
        {
            headerName: 'Thời gian',
            field: nameof.full<CalculateChargeGrid>(x => x.dateCalculate),
            width: 100,
            cellRenderer: (val: any) => {
                return moment(val.value).format('MM/YYYY');
            },
        },
        {
            headerName: 'Nhà',
            field: nameof.full<CalculateChargeGrid>(x => x.houseName),
            width: 200,
        },
        {
            headerName: 'Phòng',
            field: nameof.full<CalculateChargeGrid>(x => x.roomCode),
            width: 200,
        },
        {
            headerName: 'Tên khách',
            field: nameof.full<CalculateChargeGrid>(x => x.customerName),
            minWidth: 200,
            flex: 1,
        },
        {
            headerName: 'Số tiền (VNĐ)',
            field: nameof.full<CalculateChargeGrid>(x => x.totalCost),
            width: 200,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (val: any) => {
                return val.value
                    ? `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(val.value)}`
                    : 0;
            },
        },
        {
            headerName: 'Đã trả (VNĐ)',
            field: nameof.full<CalculateChargeGrid>(x => x.totalPaid),
            cellStyle: { textAlign: 'right' },
            width: 200,
            cellRenderer: (val: any) => {
                return val.value
                    ? `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(val.value)}`
                    : 0;
            },
        },
        {
            headerName: 'Còn lại (VNĐ)',
            field: nameof.full<CalculateChargeGrid>(x => x.totalUnpaid),
            cellStyle: { textAlign: 'right' },
            width: 200,
            cellRenderer: (val: any) => {
                return val.value
                    ? `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(val.value)}`
                    : 0;
            },
        },
    ];

    const handleChangeData = debounce(() => {
        const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
        gridController?.setParams({
            ...formValues,
            dateTime: formValues.dateTime?.startOf('month').format('YYYY-MM-DD'),
        });
        gridController?.reloadData();
    }, 300);

    const onCalculateCharge = () => {
        modalRef.current?.onOpen(
            <CalculateMoneyForm
                houseCombo={houseCombo}
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
                    gridController?.setParams({
                        ...formValues,
                        dateTime: formValues.dateTime?.startOf('month').format('YYYY-MM-DD'),
                    });
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
            />,
            'Tính tiền',
            '40%',
            icon(faCalculator),
        );
    };

    const onCollectMoney = (data: any) => {
        modalRef.current?.onOpen(
            <CollectMoneyForm
                initialValues={data}
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
                    gridController?.setParams({
                        ...formValues,
                        dateTime: formValues.dateTime?.startOf('month').format('YYYY-MM-DD'),
                    });
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
            />,
            'Thu tiền',
            '40%',
            icon(faMoneyBill),
        );
    };

    const onExport = async (data: any) => {
        overlayRef.current?.open();
        const response = (await requestApi(
            'get',
            `${EXPORT_CALCULATE_CHARGE}/${data.id}`,
            {},
            {
                responseType: 'arraybuffer',
            },
        )) as any;

        FileUtil.downloadFileTest(response);
        overlayRef.current?.close();
    };

    const onExportExcel = () => {
        gridRef.current?.api.exportDataAsExcel({
            fileName: 'Danh sách tiền phòng',
            sheetName: 'Danh sách tiền phòng',
        });
    };

    const onViewCalculateCharge = (data: any) => {
        modalViewRef.current?.onOpen(
            <ViewCalculateMoneyBill
                initialValues={data}
                onExport={() => onExport(data)}
                onSubmitSuccessfully={() => {
                    modalViewRef.current?.onClose();
                    const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
                    gridController?.setParams({
                        ...formValues,
                        dateTime: formValues.dateTime?.startOf('month').format('YYYY-MM-DD'),
                    });
                    gridController?.reloadData();
                }}
                onClose={modalViewRef.current?.onClose}
            />,
            'Hóa đơn',
            '40%',
            icon(faMoneyBill),
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
                        <BaseIcon icon={faCalculator} />
                    </div>
                    <span className="font-semibold text-lg">Tính tiền</span>
                </div>
                <div className="flex">
                    <ButtonBase
                        variant="success"
                        title="Tính tiền"
                        startIcon={faCalculator}
                        onClick={onCalculateCharge}
                    />
                    <ButtonBase
                        variant="warning"
                        title="Xuất dữ liệu"
                        size="md"
                        startIcon={faFileExport}
                        onClick={onExportExcel}
                    />
                </div>
            </div>
        );
    };

    const onDelete = async (data: any) => {
        const res = await requestApi('delete', `${DELETE_CALCULATE_CHARGE}/${data.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
            const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
            gridController?.setParams({
                ...formValues,
                dateTime: formValues.dateTime?.startOf('month').format('YYYY-MM-DD'),
            });
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
                startIcon: faEye,
                tooltip: 'Xem hóa đơn tính tiền',
                variant: 'primary',
                onClick: onViewCalculateCharge,
            },
            {
                startIcon: faPrint,
                tooltip: 'Xuất hóa đơn',
                variant: 'info',
                onClick: onExport,
            },
            {
                startIcon: faMoneyBill,
                tooltip: 'Thu tiền',
                variant: 'success',
                onClick: onCollectMoney,
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
                            name: 'dateTime',
                            initialValue: moment(),
                            children: (
                                <DatePicker
                                    clearIcon={false}
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
                actionWidth={200}
                reloadData={gridController?.reloadData}
                actionRowsReRender={getActionRows()}
            />

            <ModalBase ref={modalRef} />
            <ModalBase wrapClassName="white-bg-modal" ref={modalViewRef} />
            <Overlay ref={overlayRef} />
        </AppContainer>
    );
};

export default CalculateChargeListView;

import React, { useMemo, useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef, IActionRows } from '~/component/Grid/BaseGrid';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { faAdd, faEdit, faFileExport, faHandshake, faTrash } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import moment from 'moment';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { BaseFormRef } from '~/component/Form/BaseForm';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import { useHouseCombo } from '../house/api/useHouseCombo';
import { DELETE_DEPOSIT_API, INDEX_DEPOSIT_API } from './api/deposit.api';
import DepositForm from './components/DepositForm';
import { DepositGridDto } from './type/deposit';

import { icon } from '@fortawesome/fontawesome-svg-core';
import { Status } from '~/component/Grid/Components/Status';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';

const DepositListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const formRef = useRef<BaseFormRef>(null);
    const gridController = useBaseGrid<Service>({
        url: INDEX_DEPOSIT_API,
        gridRef: gridRef,
    });

    const { data: houseComboResponse, isFetching: isLoadingHouseCombo } = useHouseCombo(true);
    const houseCombo = useMemo(() => houseComboResponse?.data?.result ?? [], [isLoadingHouseCombo]);

    const DepositServiceColDefs: BaseGridColDef[] = [
        {
            headerName: 'Họ và tên',
            field: nameof.full<DepositGridDto>(x => x.customerName),
            minWidth: 200,
            flex: 1,
        },
        {
            headerName: 'Số điện thoại',
            field: nameof.full<DepositGridDto>(x => x.phoneNumber),
            width: 150,
            cellRenderer: (val: any) => {
                return (
                    <a href={`tel:${val.value}`}>
                        <i className="fa fa-phone">
                            <span> </span>
                            {val.value}
                        </i>
                    </a>
                );
            },
        },
        {
            headerName: 'Nhà',
            field: nameof.full<DepositGridDto>(x => x.houseName),
        },
        {
            headerName: 'Phòng',
            field: nameof.full<DepositGridDto>(x => x.roomCode),
        },
        {
            headerName: 'Tiền cọc',
            field: nameof.full<DepositGridDto>(x => x.depositAmount),
            width: 200,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (val: any) => {
                return Number(val.value ?? 0).toLocaleString('vi', { maximumFractionDigits: 2 });
            },
        },
        {
            headerName: 'Ngày đặt cọc',
            field: nameof.full<DepositGridDto>(x => x.depositDate),
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },

        {
            headerName: 'Ngày dự kiến nhận phòng',
            field: nameof.full<DepositGridDto>(x => x.expectedDate),
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return moment(params.value).format('DD/MM/YYYY');
            },
        },
        {
            headerName: 'Trạng thái',
            field: nameof.full<DepositGridDto>(x => x.status),
            width: 200,
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return <Status status={params.value} statusName={params.data.statusName} />;
            },
        },
    ];

    const getActionRows = (): Array<IActionRows> => {
        return [
            {
                startIcon: faEdit,
                tooltip: 'Chỉnh sửa',
                onClick: onUpdate,
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

    const handleChangeData = debounce(() => {
        const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
        gridController?.setParams({
            ...formValues,
            currentDate: formValues.currentDate?.format('YYYY-MM-DD'),
        });
        gridController?.reloadData();
    }, 300);

    const onExportExcel = () => {
        gridRef.current?.api.exportDataAsExcel({
            fileName: 'Danh sách tiền cọc nhà trọ',
            sheetName: 'Danh sách tiền cọc nhà trọ',
        });
    };

    const onCreate = () => {
        modalRef.current?.onOpen(
            <DepositForm
                isCreate={true}
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                onClose={modalRef.current?.onClose}
                houseCombo={houseCombo}
            />,
            'Tạo mới cọc giữ phòng',
            '50%',
        );
    };

    const onUpdate = (data: any) => {
        modalRef.current?.onOpen(
            <DepositForm
                isCreate={false}
                onSubmitSuccessfully={() => {
                    modalRef.current?.onClose();
                    gridController?.reloadData();
                }}
                initialValues={data}
                onClose={modalRef.current?.onClose}
                houseCombo={houseCombo}
            />,
            'Cập nhật tiền cọc',
            '50%',
            icon(faEdit),
        );
    };

    const onDelete = async (data: any) => {
        const res = await requestApi('delete', `${DELETE_DEPOSIT_API}/${data.id}`);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_DELETE_SUCCESS);
            gridController?.reloadData();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, res.data?.message ?? 'Có lỗi xảy ra');
            return;
        }
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
                        <BaseIcon icon={faHandshake} />
                    </div>
                    <span className="font-semibold text-lg">Cọc giữ phòng</span>
                </div>

                <div className="flex">
                    <ButtonBase startIcon={faAdd} variant="success" title="Tạo mới" onClick={onCreate} />
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

    return (
        <AppContainer title={renderTitle()} loading={gridController?.loading || isLoadingHouseCombo}>
            {/* <Fieldset title="Bộ lọc tìm kiếm">
                <BaseForm
                    ref={formRef}
                    className="mb-2 w-full"
                    baseFormItem={[
                        {
                            label: 'Tháng/năm',
                            name: 'currentDate',
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
                            className: 'col-span-4 ',
                        },
                    ]}
                    labelAlign="left"
                    labelCol={2}
                    isDisplayGrid={true}
                />
            </Fieldset> */}

            <BaseGrid
                columnDefs={DepositServiceColDefs}
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

export default DepositListView;

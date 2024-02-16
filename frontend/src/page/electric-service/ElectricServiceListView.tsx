import React, { useMemo, useRef } from 'react';
import BaseGrid, { BaseGridColDef, BaseGridRef, IActionRows } from '~/component/Grid/BaseGrid';
import { AppContainer } from '~/component/Layout/AppContainer';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';

import { faBolt, faSave } from '@fortawesome/free-solid-svg-icons';
import { GridApi } from 'ag-grid-community';
import { DatePicker, Input, Select } from 'antd';
import _, { debounce } from 'lodash';
import moment from 'moment';
import { Fieldset } from '~/component/Elements/FieldSet/FieldSet';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import CustomInputNumber from '../../component/Form/CustomInputNumber';
import { useHouseCombo } from '../house/api/useHouseCombo';
import { LIST_ROOM_FOR_CREATE_ELECTRIC, UPDATE_ELECTRIC } from './api/electric-service.api';
import { ElectricServiceDto, ServiceType } from './type/electic-service';

const ElectricServiceListView: React.FC = () => {
    const gridRef = useRef<BaseGridRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const formRef = useRef<BaseFormRef>(null);
    const gridController = useBaseGrid<Service>({
        url: LIST_ROOM_FOR_CREATE_ELECTRIC,
        gridRef: gridRef,
        params: {
            serviceType: ServiceType.Electric,
        },
    });

    const { data: houseComboResponse, isFetching: isLoadingHouseCombo } = useHouseCombo(true);
    const houseCombo = useMemo(() => houseComboResponse?.data?.result ?? [], [isLoadingHouseCombo]);

    const ElectricServiceColDefs: BaseGridColDef[] = [
        {
            headerName: 'Thời gian',
            field: nameof.full<ElectricServiceDto>(x => x.month),
            cellRenderer: (params: any) => {
                return (
                    <div className="text-center">
                        {params.data.month}/{params.data.year}
                    </div>
                );
            },
        },
        {
            headerName: 'Nhà',
            field: nameof.full<ElectricServiceDto>(x => x.houseName),
            flex: 1,
            minWidth: 200,
        },
        {
            headerName: 'Phòng',
            field: nameof.full<ElectricServiceDto>(x => x.roomCode),
        },
        {
            headerName: 'Chỉ số điện cũ',
            field: nameof.full<ElectricServiceDto>(x => x.oldElectricValue),
            width: 200,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (params: any) => {
                return (
                    <CustomInputNumber
                        onChange={debounce((val: any) => {
                            params.setValue(val);
                            params.data.usedElectricValue = params.data.newElectricValue - val;
                            const gridApi = _.get(params, 'api') as GridApi | null;
                            gridApi?.refreshCells?.({
                                rowNodes: [params.node],
                                columns: [nameof.full<ElectricServiceDto>(x => x.usedElectricValue)],
                                force: true,
                            });
                            const data = params.data;
                            const newElectricValue = data.newElectricValue ?? 0;
                            if (!!val && Number(val) > newElectricValue) {
                                return NotifyUtil.error(
                                    NotificationConstant.TITLE,
                                    'Chỉ số điện cũ không được lớn hơn chỉ số điện mới',
                                );
                            }
                        }, 300)}
                        defaultValue={params.value}
                    />
                );
            },
        },
        {
            headerName: 'Chỉ số điện mới',
            field: nameof.full<ElectricServiceDto>(x => x.newElectricValue),
            cellStyle: { textAlign: 'right' },
            width: 200,
            cellRenderer: (params: any) => {
                return (
                    <CustomInputNumber
                        onChange={debounce((val: any) => {
                            params.setValue(val);
                            params.data.usedElectricValue = val - params.data.oldElectricValue;
                            const gridApi = _.get(params, 'api') as GridApi | null;
                            gridApi?.refreshCells?.({
                                rowNodes: [params.node],
                                columns: [nameof.full<ElectricServiceDto>(x => x.usedElectricValue)],
                                force: true,
                            });
                            const data = params.data;
                            const oldElectricValue = data.oldElectricValue ?? 0;
                            if (!!val && Number(val) < oldElectricValue) {
                                NotifyUtil.error(
                                    NotificationConstant.TITLE,
                                    'Chỉ số điện cũ không được lớn hơn chỉ số điện mới',
                                );
                            }
                        }, 300)}
                        defaultValue={params.value}
                    />
                );
            },
        },
        {
            headerName: 'Sử dụng',
            field: nameof.full<ElectricServiceDto>(x => x.usedElectricValue),
            cellStyle: { textAlign: 'right' },
            width: 200,
            cellRenderer: (val: any) => {
                return val.value
                    ? `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(val.value)}`
                    : '';
            },
        },
    ];

    const handleSaveRow = async (data: any) => {
        const oldElectricValue = data.oldElectricValue ?? 0;
        const newElectricValue = data.newElectricValue ?? 0;
        if (!!oldElectricValue && !!newElectricValue && Number(oldElectricValue) > Number(newElectricValue)) {
            return NotifyUtil.error(NotificationConstant.TITLE, 'Chỉ số điện cũ không được lớn hơn chỉ số điện mới');
        }

        const formData = {
            id: data?.id,
            roomId: data?.roomId,
            month: data?.month,
            year: data?.year,
            serviceId: data?.serviceId,
            oldElectricValue: data?.oldElectricValue,
            newElectricValue: data?.newElectricValue,
            usedElectricValue: data?.usedElectricValue,
        };

        const res = await requestApi('put', UPDATE_ELECTRIC, formData);
        if (res.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, NotificationConstant.DESCRIPTION_UPDATE_SUCCESS);
            const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
            gridController?.setParams({
                ...formValues,
                currentDate: formValues.currentDate?.format('YYYY-MM-DD'),
                serviceType: ServiceType.Electric,
            });
            gridController?.reloadData();
            return;
        } else {
            NotifyUtil.error(
                NotificationConstant.TITLE,
                'Vui lòng kiểm tra lại chỉ số điện cũ và mới của các tháng hiện tại và 2 tháng liền kề. Dữ liệu đang bị xung đột ! ( chỉ số cũ không được lớn hơn chỉ số mới )',
            );
            return;
        }
    };

    const getActionRows = (): Array<IActionRows> => {
        return [
            {
                startIcon: faSave,
                title: 'Lưu',
                onClick: handleSaveRow,
            },
        ];
    };

    const handleChangeData = debounce(() => {
        const formValues = formRef.current?.getFieldsValue() ?? ({} as any);
        gridController?.setParams({
            ...formValues,
            currentDate: formValues.currentDate?.format('YYYY-MM-DD'),
            serviceType: ServiceType.Electric,
        });
        gridController?.reloadData();
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
                    <BaseIcon icon={faBolt} />
                </div>
                <span className="font-semibold text-lg">Chỉ số điện</span>
            </div>
        );
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
                        {
                            label: '',
                            name: '',
                            children: (
                                <>
                                    <strong>Lưu ý:</strong>
                                    <div className="text-sm">
                                        - Bạn phải gán dịch vụ thuộc loại điện cho khách thuê trước thì phần chỉ số này
                                        mới được tính cho phòng đó khi tính tiền.
                                    </div>
                                    <div className="text-sm">
                                        - Đối với lần đầu tiên sử dụng phần mềm bạn sẽ phải nhập chỉ số cũ và mới cho
                                        tháng sử dụng đầu tiên, các tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới
                                        tháng trước làm chỉ số cũ tháng sau.
                                    </div>
                                </>
                            ),
                            className: 'col-span-12',
                        },
                    ]}
                    labelAlign="left"
                    labelCol={2}
                    isDisplayGrid={true}
                />
            </Fieldset>

            <BaseGrid
                columnDefs={ElectricServiceColDefs}
                data={gridController?.data || []}
                ref={gridRef}
                numberRows={true}
                pagination={true}
                actionRows={false}
                actionRowsReRender={getActionRows()}
            />

            <ModalBase ref={modalRef} />
        </AppContainer>
    );
};

export default ElectricServiceListView;

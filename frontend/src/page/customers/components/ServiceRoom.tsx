import React, { useImperativeHandle, useRef } from 'react';
import NotificationConstant from '~/configs/contants';

import _, { debounce } from 'lodash';
import CustomInputNumber from '~/component/Form/CustomInputNumber';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { requestApi } from '~/lib/axios';
import { Member } from '~/types/shared/Customer';
import { Service, ServiceCustomer } from '~/types/shared/Service';
import NotifyUtil from '~/util/NotifyUtil';
import { CUSTOMER_UPDATE_SERVICE_CUSTOMER_API } from '../api/customer.api';
interface Props {
    customerId?: string | null;
    readonly?: boolean;
    initialValues?: ServiceCustomer[];
    members: Member[];
    listServices?: Service[];
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    mask?: () => void;
    unMask?: () => void;
}

export interface ServiceRoomRef {
    onSave: () => void;
}
const ServiceRoom = React.memo(
    React.forwardRef<ServiceRoomRef, Props>((props, ref): JSX.Element => {
        const gridRef = useRef<BaseGridRef>(null);
        const { readonly = false } = props;

        const listServices = (props.listServices || []).map((item: Service) => {
            const service = (props.initialValues || []).find((x: ServiceCustomer) => x.serviceId === item.id);
            const price = ['DIEN', 'NUOC'].includes(item.type) ? item.price : service?.price ?? item.price;
            return {
                serviceId: item.id,
                name: item.name,
                type: item.type,
                price: price,
                unit: item.unit,
                quantity: service?.quantity ?? 1,
                selected: !_.isUndefined(service),
            };
        });

        const onSubmit = async () => {
            const serviceValuesSelected = gridRef.current?.api.getSelectedRows() as any[];
            const listServices = serviceValuesSelected.map(row => {
                return {
                    price: row.price,
                    quantity: row.quantity,
                    serviceId: row.serviceId,
                } as ServiceCustomer;
            });

            props.mask?.();
            const response = await requestApi('PUT', `${CUSTOMER_UPDATE_SERVICE_CUSTOMER_API}/${props.customerId}`, {
                services: listServices,
                members: props.members,
            });
            if (response.data?.success) {
                NotifyUtil.success(NotificationConstant.TITLE, 'Successfully');
                props?.onSubmitSuccessfully?.();
                props.onClose?.();
                props.unMask?.();
                return;
            } else {
                NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Có lỗi xảy ra');
                props.onClose?.();
                props.unMask?.();
                return;
            }
        };

        const onInputChange = (data: any) => {
            listServices.forEach((item: any) => {
                if (item.serviceId === data.serviceId) {
                    item = data;
                }
            });
        };

        const ServiceColDefs: BaseGridColDef[] = [
            {
                headerName: 'Dich vụ sử dụng',
                field: nameof.full<Service>(x => x.name),
                minWidth: 300,
                headerCheckboxSelection: !readonly,
                headerCheckboxSelectionFilteredOnly: !readonly,
                checkboxSelection: true,
                flex: 1,
            },
            {
                headerName: 'Đơn giá',
                field: nameof.full<Service>(x => x.price),
                minWidth: 200,
                cellStyle: { textAlign: 'right' },
                cellRenderer: (params: any) => {
                    const isNoEdit = ['DIEN', 'NUOC'].includes(params.data.type);
                    return !isNoEdit ? (
                        <CustomInputNumber
                            onChange={debounce((val: any) => {
                                params.setValue(val);
                                onInputChange({ ...params.data, quantity: val });
                            }, 300)}
                            defaultValue={params.value}
                        />
                    ) : (
                        <div style={{ textAlign: 'right', width: '100%' }}>
                            {params.value.toLocaleString('vi', { maximumFractionDigits: 2 })}
                        </div>
                    );
                },
            },
            {
                headerName: 'Đơn vị tính',
                field: nameof.full<Service>(x => x.unit),
                valueFormatter: (params: any) => {
                    const unit = JSON.parse(params.value);
                    return unit;
                },
            },
            {
                headerName: 'Số lượng',
                field: 'quantity',
                cellStyle: { textAlign: 'right' },
                cellRenderer: (params: any) => {
                    const isNoEdit = ['DIEN', 'NUOC'].includes(params.data.type);
                    return !isNoEdit ? (
                        <CustomInputNumber
                            onChange={debounce((val: any) => {
                                params.setValue(val);
                                onInputChange({ ...params.data, quantity: val });
                            }, 300)}
                            defaultValue={params.value}
                        />
                    ) : (
                        <div style={{ textAlign: 'right', width: '100%' }}>
                            {params.value.toLocaleString('vi', { maximumFractionDigits: 2 })}
                        </div>
                    );
                },
            },
        ];

        useImperativeHandle(
            ref,
            () => ({
                onSave: onSubmit,
            }),
            [],
        );

        return (
            <>
                <div className={'border border-gray-600 p-3 '}>
                    <strong>Lưu ý:</strong>
                    <p>
                        Vui lòng chọn dịch vụ cho khách thuê.
                        <br /> Nếu khách có chọn dịch vụ thì khi tính tiền phòng phần mềm sẽ tự tính các khoản phí vào
                        hóa đơn;
                        <br /> Ngược lại nếu không chọn phần mềm sẽ bỏ qua.
                        <br /> Đối với dịch vụ là loại điện/ nước thì sẽ tính theo chỉ số điện/ nước.
                        <br /> Đối với các dịch vụ khác sẽ tính theo số lượng (ví dụ phòng có 2 xe đạp nhập số lượng là
                        2)
                    </p>
                </div>
                <BaseGrid
                    ref={gridRef}
                    onGridReady={params => {
                        const gridApi = params.api;
                        gridApi.forEachNode(node => {
                            if (node.data.selected) {
                                node.setSelected(true);
                            }
                        });
                    }}
                    key={props.customerId}
                    columnDefs={ServiceColDefs}
                    data={listServices}
                    numberRows={false}
                    pagination={false}
                    actionRows={false}
                    actionRowsWidth={120}
                    pinAction
                    // gridOptions={{
                    //     rowClassRules: {
                    //         'ag-row-selected': (params: any) => {
                    //             console.log(params.node.selected === true && readonly);
                    //             return readonly;
                    //         },
                    //     },
                    // }}
                />
            </>
        );
    }),
);

export default ServiceRoom;

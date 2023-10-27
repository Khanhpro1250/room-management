import React, { useImperativeHandle, useRef } from 'react';
import NotificationConstant from '~/configs/contants';

import { InputNumber } from 'antd';
import _ from 'lodash';
import { OverlayRef } from '~/component/Elements/loading/Overlay';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { requestApi } from '~/lib/axios';
import { Service, ServiceCustomer } from '~/types/shared/Service';
import NotifyUtil from '~/util/NotifyUtil';
import { CUSTOMER_UPDATE_SERVICE_CUSTOMER_API } from '../api/customer.api';
import '../styles/index.scss'
interface Props {
    customerId?: string | null;
    readonly?: boolean;
    initialValues?: ServiceCustomer[];
    listServices?: Service[];
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

export interface ServiceRoomRef {
    onSave: () => void;
}
const ServiceRoom = React.memo(React.forwardRef<ServiceRoomRef, Props>((props, ref): JSX.Element => {

    const overlayRef = useRef<OverlayRef>(null);
    const gridRef = useRef<BaseGridRef>(null);
    const { readonly = false } = props;

    const listServices = (props.listServices || []).map((item: Service) => {
        const service = (props.initialValues || []).find((x: ServiceCustomer) => x.serviceId === item.id);
        return {
            serviceId: item.id,
            name: item.name,
            price: service?.price ?? item.price,
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

        overlayRef.current?.open();
        const response = await requestApi('PUT', `${CUSTOMER_UPDATE_SERVICE_CUSTOMER_API}/${props.customerId}`, {
            services: listServices,
        });
        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, 'Successfully');
            props?.onSubmitSuccessfully?.();
            props.onClose?.();
            overlayRef.current?.close();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Có lỗi xảy ra');
            props.onClose?.();
            overlayRef.current?.close();
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
            // editable: !readonly,            
            // valueFormatter: (params: any) => {
            //     return params.value.toLocaleString('vi', { maximumFractionDigits: 2 });
            // }
            cellRenderer: (params: any) => {
                return !readonly ? (
                    <InputNumber
                        type='number'
                        onChange={e => {
                            params.setValue(`${e}`);
                            onInputChange({ ...params.data, params: e });
                        }}
                        style={{ textAlign: 'right', width: '100%' }}
                        value={params.value}
                    />
                ) : (
                    <div style={{ textAlign: 'right', width: '100%' }}>{params.value.toLocaleString('vi', { maximumFractionDigits: 2 })}</div>
                );
            },
        },
        {
            headerName: 'Đơn vị tính',
            field: nameof.full<Service>(x => x.unit),
            width: 120,
        },
        {
            headerName: 'Số lượng',
            field: 'quantity',
            width: 150,
            cellStyle: { textAlign: 'right' },
            // editable: !readonly,
            // valueFormatter: (params: any) => {
            //     return params.value.toLocaleString('vi', { maximumFractionDigits: 2 });
            // },
            cellRenderer: (params: any) => {
                return !readonly ? (
                    <InputNumber
                        style={{ textAlign: 'right', width: '100%' }}
                        value={params.value}
                        type='number'
                        onChange={e => {
                            params.setValue(`${e}`);
                            onInputChange({ ...params.data, quantity: e });
                        }}
                    />
                ) : (
                    <div style={{ textAlign: 'right', width: '100%' }}>{params.value.toLocaleString('vi', { maximumFractionDigits: 2 })}</div>
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
        <BaseGrid
            ref={gridRef}
            onGridReady={(params) => {
                const gridApi = params.api;
                gridApi.forEachNode((node) => {
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
            gridOptions={{
                rowClassRules: {
                    'ag-row-selected': (params: any) => {
                        console.log(params.node.selected === true && readonly)
                        return readonly;
                    },
                },
            }}
        />
    );
})
);

export default ServiceRoom;

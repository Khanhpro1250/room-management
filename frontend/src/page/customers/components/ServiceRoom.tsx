import { Method } from 'axios';
import React, { useImperativeHandle, useRef } from 'react';
import { BaseFormRef } from '~/component/Form/BaseForm';
import NotificationConstant from '~/configs/contants';

import { Input, InputNumber } from 'antd';
import { OverlayRef } from '~/component/Elements/loading/Overlay';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { ModalRef } from '~/component/Modal/ModalBase';
import { requestApi } from '~/lib/axios';
import { Service } from '~/types/shared/Service';
import NotifyUtil from '~/util/NotifyUtil';
import { CUSTOMER_CREATE_API, CUSTOMER_UPDATE_API } from '../api/customer.api';
import _, { debounce } from 'lodash';
interface Props {
    parentId?: string | null;
    readonly?: boolean;
    initialValues?: Service[];
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

export interface ServiceRoomRef {
    onSave: () => void;
}
const ServiceRoom = React.forwardRef<ServiceRoomRef, Props>((props, ref): JSX.Element => {
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridRef = useRef<BaseGridRef>(null);

    const initData = (props.initialValues || []).map((item: Service) => {
        return {
            serviceId: item.id,
            name: item.name,
            price: item.price,
            unit: item.unit,
            quantity: 1,
        };
    });
    const onSubmit = async () => {
        console.log('onSubmit', initData);
        // const urlParams: Record<
        //     string,
        //     {
        //         url: string;
        //         method: Method;
        //         message: string;
        //     }
        // > = {
        //     create: {
        //         url: CUSTOMER_CREATE_API,
        //         method: 'post',
        //         message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
        //     },
        //     update: {
        //         url: `${CUSTOMER_UPDATE_API}/${props.initialValues?.id}`,
        //         method: 'put',
        //         message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
        //     },
        // };
        // const formValues = formRef.current?.getFieldsValue();
        // const urlParam = props.initialValues ? urlParams.update : urlParams.create;
        // overlayRef.current?.open();
        // const response = await requestApi(urlParam.method, urlParam.url, {
        //     ...formValues,
        // });
        // if (response.data?.success) {
        //     NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
        //     props?.onSubmitSuccessfully?.();
        //     props.onClose?.();
        //     overlayRef.current?.close();
        //     return;
        // } else {
        //     NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Có lỗi xảy ra');
        //     props.onClose?.();
        //     overlayRef.current?.close();
        //     return;
        // }
    };

    const onInputChange = (data: any) => {
        initData.forEach((item: any) => {
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
            flex: 1,
        },
        {
            headerName: 'Đơn giá',
            field: nameof.full<Service>(x => x.price),
            minWidth: 200,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (params: any) => {
                return (
                    <InputNumber
                        onChange={e => {
                            params.setValue(`${e}`);
                            onInputChange({ ...params.data, params: e });
                        }}
                        style={{ textAlign: 'right', width: '100%' }}
                        value={params.value}
                    />
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
            cellStyle: { textAlign: 'center' },
            type: 'number',
            cellRenderer: (params: any) => {
                return (
                    <InputNumber
                        style={{ textAlign: 'right', width: '100%' }}
                        value={params.value}
                        onChange={e => {
                            params.setValue(`${e}`);
                            onInputChange({ ...params.data, quantity: e });
                        }}
                    />
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

    const handleCancel = () => modalRef.current?.onClose();

    return (
        <BaseGrid
            columnDefs={ServiceColDefs}
            data={initData}
            numberRows={false}
            pagination={false}
            actionRows={false}
            actionRowsWidth={120}
            ref={gridRef}
        />
    );
});

export default ServiceRoom;

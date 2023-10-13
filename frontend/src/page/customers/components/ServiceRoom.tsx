import { Method } from 'axios';
import React, { useImperativeHandle, useRef } from 'react';
import { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';

import { OverlayRef } from '~/component/Elements/loading/Overlay';
import BaseGrid, { BaseGridColDef } from '~/component/Grid/BaseGrid';
import { ModalRef } from '~/component/Modal/ModalBase';
import { requestApi } from '~/lib/axios';
import { Customer } from '~/types/shared/Customer';
import NotifyUtil from '~/util/NotifyUtil';
import { CUSTOMER_CREATE_API, CUSTOMER_UPDATE_API } from '../api/customer.api';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { Service } from '~/types/shared/Service';
import { Checkbox } from 'antd';
interface Props {
    parentId?: string | null;
    readonly?: boolean;
    initialValues?: any;
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


    const onSubmit = async () => {
        const urlParams: Record<
            string,
            {
                url: string;
                method: Method;
                message: string;
            }
        > = {
            create: {
                url: CUSTOMER_CREATE_API,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${CUSTOMER_UPDATE_API}/${props.initialValues?.id}`,
                method: 'put',
                message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
            },
        };
        const formValues = formRef.current?.getFieldsValue();
        const urlParam = props.initialValues ? urlParams.update : urlParams.create;
        overlayRef.current?.open();
        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,

        });

        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
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




    const ServiceColDefs: BaseGridColDef[] = [
        {
            headerName: 'Tên',
            field: nameof.full<Service>(x => x.name),
            minWidth: 300,
            flex: 1,
        },
        {
            headerName: 'Loại dịch vụ',
            field: nameof.full<Service>(x => x.type),
            width: 150,
        },
        {
            headerName: 'Đơn giá',
            field: nameof.full<Service>(x => x.price),
            width: 120,
            cellStyle: { textAlign: 'right' },
            cellRenderer: (val: any) => {
                return Number(val.value ?? 0).toLocaleString('vi', { maximumSignificantDigits: 2 });
            },
        },
        {
            headerName: 'Đơn vị tính',
            field: nameof.full<Service>(x => x.unit),
            width: 120,
        },
        {
            headerName: 'Trạng thái',
            field: nameof.full<Service>(x => x.status),
            width: 120,
            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <Checkbox disabled checked={params.value} />
                )
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
            data={props.initialValues || []}
            numberRows={false}
            pagination={false}
            actionRows={false}
            actionRowsWidth={120}
            //@ts-ignore
            isRowSelectable={true}
            rowSelection={'multiple'}
        />
    );
});

export default ServiceRoom;

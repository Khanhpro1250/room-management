import React, { useImperativeHandle, useRef } from 'react';
import { BaseFormRef } from '~/component/Form/BaseForm';

import { InputNumber } from 'antd';
import { OverlayRef } from '~/component/Elements/loading/Overlay';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { ModalRef } from '~/component/Modal/ModalBase';
import { Member } from '~/types/shared/Customer';
import { useBaseGrid } from '~/hook/useBaseGrid';
import { RowNode } from 'ag-grid';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { Method } from 'axios';
import NotificationConstant from '~/configs/contants';
import NotifyUtil from '~/util/NotifyUtil';
import { requestApi } from '~/lib/axios';
import { CUSTOMER_CREATE_API, CUSTOMER_UPDATE_API } from '../api/customer.api';
interface Props {
    customerId?: string | null;
    readonly?: boolean;
    initialValues?: Member[];
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

export interface MemberFormRef {
    onSave: () => void;
}
const MemberForm = React.forwardRef<MemberFormRef, Props>((props, ref): JSX.Element => {
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const gridRef = useRef<BaseGridRef>(null);
    let initialData = [] as Member[];

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
                url: `${CUSTOMER_UPDATE_API}/${props.customerId}`,
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

    const onAddRow = () => {
        initialData.push({
            name:'123123'+Date.now(),
        } as Member);
        gridRef.current?.api.setRowData(initialData);
    }

    const onDeleteRow = (data: Member, rowNode?: RowNode) => {
        initialData = initialData.filter((x, idx) => idx !== rowNode?.rowIndex);
        gridRef.current?.api.setRowData(initialData);
    };



    const MemberColDefs: BaseGridColDef[] = [
        {
            headerName: 'Họ và tên',
            field: nameof.full<Member>(x => x.name),
            minWidth: 300,
            flex: 1,
        },
        {
            headerName: 'Ngày sinh',
            field: nameof.full<Member>(x => x.dateOfBirth),
            minWidth: 200,
            cellStyle: { textAlign: 'right' },
        },
        {
            headerName: 'CMND/CCCD',
            field: nameof.full<Member>(x => x.identityNo),
            width: 120,
        },
        {
            headerName: 'Địa chỉ',
            field: nameof.full<Member>(x => x.permanentAddress),
            width: 150,
            cellStyle: { textAlign: 'center' },
        },
        {
            headerName: 'Số điện thoại',
            field: nameof.full<Member>(x => x.phoneNumber),
            width: 150,
            cellStyle: { textAlign: 'center' },
        },
        {
            headerName: 'Số xe',
            field: nameof.full<Member>(x => x.vehicleNumber),
            width: 150,
            cellStyle: { textAlign: 'center' },
        },
        {
            headerName: 'Ngày ĐKTT',
            field: nameof.full<Member>(x => x.temporarilyAbsentDate),
            width: 150,
            cellStyle: { textAlign: 'center' },
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
        <div>
            <BaseGrid
                columnDefs={MemberColDefs}
                data={initialData}
                numberRows={false}
                pagination={false}
                actionRows={true}
                actionRowsWidth={90}
                actionRowsList={{
                    hasDeleteBtn: true,
                    onClickDeleteBtn: onDeleteRow,
                }}
                ref={gridRef}
            >
                <GridToolbar
                    justIcon
                    size='md'
                    hasCreateButton
                    onClickCreateButton={onAddRow}
                />
            </BaseGrid>

        </div>
    );
});

export default MemberForm;

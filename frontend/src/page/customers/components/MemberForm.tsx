import React, { useImperativeHandle, useRef } from 'react';

import { RowNode } from 'ag-grid';
import { DatePicker } from 'antd';
import Input from 'antd/lib/input/Input';
import moment from 'moment';
import BaseGrid, { BaseGridColDef, BaseGridRef } from '~/component/Grid/BaseGrid';
import { GridToolbar } from '~/component/Grid/Components/GridToolbar';
import { ModalRef } from '~/component/Modal/ModalBase';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { Member } from '~/types/shared/Customer';
import { ServiceCustomer } from '~/types/shared/Service';
import NotifyUtil from '~/util/NotifyUtil';
import { CUSTOMER_UPDATE_SERVICE_CUSTOMER_API } from '../api/customer.api';
interface Props {
    customerId?: string | null;
    maxNumberOfPeople?: number;
    readonly?: boolean;
    initialValues?: Member[];
    services: ServiceCustomer[];
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    mask?: () => void;
    unMask?: () => void;
}

export interface MemberFormRef {
    onSave: () => void;
    onAddRow: () => void;
}
const MemberForm = React.forwardRef<MemberFormRef, Props>((props, ref): JSX.Element => {
    const modalRef = useRef<ModalRef>(null);
    const gridRef = useRef<BaseGridRef>(null);
    let initialData = props.initialValues || ([] as Member[]);

    const onSubmit = async () => {
        const rowData = getGridData();
        const isValid =
            rowData?.length > 0 &&
            rowData.every((x: Member) => {
                return (
                    x.name && x.dateOfBirth && x.identityNo && x.permanentAddress && x.phoneNumber && x.vehicleNumber
                );
            });

        if (!isValid) {
            return NotifyUtil.error(NotificationConstant.TITLE, 'Vui lòng nhập đầy đủ thông tin thành viên');
        }
        props.mask?.();
        const response = await requestApi('PUT', `${CUSTOMER_UPDATE_SERVICE_CUSTOMER_API}/${props.customerId}`, {
            members: rowData,
            services: props.services,
        });
        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, 'Successfully');
            props.onClose?.();
        }
        props.unMask?.();
    };

    const getGridData = () => {
        const rowData: Member[] = [];
        gridRef.current?.api.forEachNode((rowNode: any) => {
            rowData.push(rowNode.data);
        });
        return rowData;
    };

    const onAddRow = () => {
        const data = getGridData();
        const numberOfPeople = (props?.maxNumberOfPeople ?? 0) - 1;
        if (data?.length >= numberOfPeople) {
            return NotifyUtil.error(
                NotificationConstant.TITLE,
                'Số lượng thành viên không được vượt quá ' + numberOfPeople,
            );
        }
        if (
            data.some(
                (x: Member) =>
                    !x.name ||
                    !x.dateOfBirth ||
                    !x.identityNo ||
                    !x.permanentAddress ||
                    !x.phoneNumber ||
                    !x.vehicleNumber,
            )
        ) {
            return NotifyUtil.error(NotificationConstant.TITLE, 'Vui lòng nhập đầy đủ thông tin thành viên');
        }
        initialData.push({
            dateOfBirth: undefined,
            identityNo: '',
            name: '',
            permanentAddress: '',
            phoneNumber: '',
            temporarilyDate: undefined,
            vehicleNumber: '',
        } as Member);
        gridRef.current?.api.setRowData(initialData);
    };

    const onDeleteRow = (data: Member, rowNode?: RowNode) => {
        initialData = initialData.filter((x, idx) => idx !== rowNode?.rowIndex);
        gridRef.current?.api.setRowData(initialData);
    };

    const MemberColDefs: BaseGridColDef[] = [
        {
            headerName: 'Họ và tên',
            field: nameof.full<Member>(x => x.name),

            editable: true,
            cellRenderer: (params: any) => {
                return (
                    <Input
                        className="w-full"
                        defaultValue={params.value}
                        onChange={(e: any) => {
                            params.setValue(e.target.value);
                        }}
                    />
                );
            },
        },
        {
            headerName: 'Ngày sinh',
            field: nameof.full<Member>(x => x.dateOfBirth),

            cellStyle: { textAlign: 'right' },
            cellRenderer: (params: any) => {
                return (
                    <DatePicker
                        format="DD/MM/YYYY"
                        className="w-full"
                        value={params.value ? moment(params.value) : null}
                        onChange={(e: any) => {
                            params.setValue(e?.format('YYYY-MM-DD'));
                        }}
                    />
                );
            },
        },
        {
            headerName: 'CMND/CCCD',
            field: nameof.full<Member>(x => x.identityNo),

            cellRenderer: (params: any) => {
                return (
                    <Input
                        value={params.value}
                        className="w-full"
                        onChange={(e: any) => {
                            params.setValue(e.target.value);
                        }}
                    />
                );
            },
        },
        {
            headerName: 'Địa chỉ',
            field: nameof.full<Member>(x => x.permanentAddress),

            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <Input
                        value={params.value}
                        className="w-full"
                        onChange={(e: any) => {
                            params.setValue(e.target.value);
                        }}
                    />
                );
            },
        },
        {
            headerName: 'Số điện thoại',
            field: nameof.full<Member>(x => x.phoneNumber),

            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <Input
                        value={params.value}
                        className="w-full"
                        onChange={(e: any) => {
                            params.setValue(e.target.value);
                        }}
                    />
                );
            },
        },
        {
            headerName: 'Số xe',
            field: nameof.full<Member>(x => x.vehicleNumber),

            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <Input
                        value={params.value}
                        className="w-full"
                        onChange={(e: any) => {
                            params.setValue(e.target.value);
                        }}
                    />
                );
            },
        },
        {
            headerName: 'Ngày ĐKTT',
            field: nameof.full<Member>(x => x.temporarilyDate),

            cellStyle: { textAlign: 'center' },
            cellRenderer: (params: any) => {
                return (
                    <DatePicker
                        format="DD/MM/YYYY"
                        className="w-full"
                        value={params.value ? moment(params.value) : null}
                        onChange={(e: any) => {
                            params.setValue(e?.format('YYYY-MM-DD'));
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
            onAddRow,
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
                actionRowsWidth={100}
                pinAction
                actionRowsList={{
                    hasDeleteBtn: true,
                    onClickDeleteBtn: onDeleteRow,
                }}
                ref={gridRef}
            />
        </div>
    );
});

export default MemberForm;

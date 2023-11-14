import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input } from 'antd';
import { Method } from 'axios';
import moment from 'moment';
import React, { useImperativeHandle, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { Contract } from '~/types/shared/Contract';
import { Customer } from '~/types/shared/Customer';

import NotifyUtil from '~/util/NotifyUtil';
import { CREATE_CONTACT_API, EXPORT_CONTRACT_API, UPDATE_CONTACT_API } from '../api/customer.api';
import FileUtil from '~/util/FileUtil';

interface Props {
    initialValues?: Partial<Contract>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    customer?: Customer;
    roomId?: string | null;
}

export interface ContractFormRef {
    onSave: () => void;
}

const ContractForm = React.forwardRef<ContractFormRef, Props>((props, ref): JSX.Element => {
    const formRef = useRef<BaseFormRef>(null);
    const initialValues = {
        ...props.initialValues,
        effectDate: props.initialValues?.effectDate ? moment(props.initialValues?.effectDate) : undefined,
        expiredDate: props.initialValues?.expiredDate ? moment(props.initialValues?.expiredDate) : undefined,
        signedDate: props.initialValues?.signedDate ? moment(props.initialValues?.signedDate) : undefined,
    } as Contract;

    const onSubmit = async () => {
        const isValidForm = await formRef.current?.isFieldsValidate();

        if (!isValidForm) {
            NotifyUtil.error(NotificationConstant.TITLE, NotificationConstant.ERROR_MESSAGE_UTIL);
            return;
        }

        const formValues = formRef.current?.getFieldsValue();

        const urlParams: Record<
            string,
            {
                url: string;
                method: Method;
                message: string;
            }
        > = {
            create: {
                url: CREATE_CONTACT_API,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${UPDATE_CONTACT_API}/${props.initialValues?.id}`,
                method: 'put',
                message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
            },
        };

        const urlParam = props.initialValues ? urlParams.update : urlParams.create;

        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,
            roomId: props.roomId,
            customerId: props.customer?.id,
        });

        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
            props?.onSubmitSuccessfully?.();
            props.onClose?.();
            return;
        }
    };

    const onExport = async () => {
        const isValidForm = await formRef.current?.isFieldsValidate();

        if (!isValidForm) {
            NotifyUtil.error(NotificationConstant.TITLE, NotificationConstant.ERROR_MESSAGE_UTIL);
            return;
        }

        const formValues = formRef.current?.getFieldsValue();

        const response = (await requestApi(
            'POST',
            EXPORT_CONTRACT_API,
            {
                ...formValues,
                roomId: props.roomId,
                customerId: props.customer?.id,
            },
            {
                responseType: 'arraybuffer',
            },
        )) as any;

        FileUtil.downloadFileTest(response);
    };

    useImperativeHandle(
        ref,
        () => ({
            onSave: onSubmit,
        }),
        [],
    );

    return (
        <AppModalContainer>
            <BaseForm
                initialValues={initialValues}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Số hợp đồng',
                        name: nameof.full<Contract>(x => x.contractNumber),
                        children: <Input placeholder="Nhập sô hợp đồng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày ký hợp đồng',
                        name: nameof.full<Contract>(x => x.signedDate),
                        children: (
                            <DatePicker
                                className="w-full"
                                // disabled={props.readonly}
                                placeholder="Ngày ký hợp đồng"
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày hiệu lực',
                        name: nameof.full<Contract>(x => x.effectDate),
                        children: (
                            <DatePicker
                                className="w-full"
                                // disabled={props.readonly}
                                placeholder="Ngày hiệu lực"
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Số tháng',
                        name: nameof.full<Contract>(x => x.month),
                        children: (
                            <Input
                                onChange={e => {
                                    const val = Number(e.target.value);
                                    const formValue = formRef.current?.getFieldsValue() as Contract;
                                    if (formValue.effectDate) {
                                        const expiredDate = moment(formValue.effectDate).add(val, 'months');
                                        formRef.current?.setFieldsValue({ expiredDate: expiredDate });
                                    }
                                }}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày kết thúc hợp đồng',
                        name: nameof.full<Contract>(x => x.expiredDate),
                        children: (
                            <DatePicker
                                className="w-full"
                                // disabled={props.readonly}
                                placeholder="Ngày kết thúc hợp đồng"
                                onChange={e => {
                                    const formValue = formRef.current?.getFieldsValue() as Contract;
                                    const month = moment(e).diff(formValue.effectDate, 'months');
                                    formRef.current?.setFieldsValue({ month: month });
                                }}
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                ]}
                labelAlign="left"
                labelCol={4}
                labelWidth={200}
                isDisplayGrid={true}
            />
            <div className=" flex-1 flex items-center justify-start mb-2">
                <ButtonBase title="Tải hợp đồng" size="md" startIcon={faDownload} variant="danger" onClick={onExport} />
            </div>
        </AppModalContainer>
    );
});

export default ContractForm;

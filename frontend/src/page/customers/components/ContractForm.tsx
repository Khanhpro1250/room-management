import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input } from 'antd';
import { Method } from 'axios';
import moment, { Moment } from 'moment';
import React, { useImperativeHandle, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { Contract } from '~/types/shared/Contract';
import { Customer } from '~/types/shared/Customer';

import FileUtil from '~/util/FileUtil';
import NotifyUtil from '~/util/NotifyUtil';
import { CREATE_CONTACT_API, EXPORT_CONTRACT_API, UPDATE_CONTACT_API } from '../api/customer.api';

interface Props {
    initialValues?: Partial<Contract>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    customer?: Customer;
    roomId?: string | null;
    roomCode?: string | null;
    mask?: () => void;
    unMask?: () => void;
}

export interface ContractFormRef {
    onSave: () => void;
    onExport: () => void;
    onSaveAndExport: () => void;
}

const genContractNumber = (signedDate: Moment, roomCode: string | null) => {
    if (!signedDate || !roomCode) return '';
    const date = signedDate;
    return `HD-${roomCode}-${date.format('YYYYMMDD')}`;
    // return `HD-${roomCode}-${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
};

const ContractForm = React.forwardRef<ContractFormRef, Props>((props, ref): JSX.Element => {
    const formRef = useRef<BaseFormRef>(null);

    const initialValues = {
        ...props.initialValues,
        effectDate: props.initialValues?.effectDate ? moment(props.initialValues?.effectDate) : undefined,
        expiredDate: props.initialValues?.expiredDate ? moment(props.initialValues?.expiredDate) : undefined,
        signedDate: props.initialValues?.signedDate ? moment(props.initialValues?.signedDate) : undefined,
    } as Contract;

    const onSubmit = async (callback?: any) => {
        const isValidForm = await formRef.current?.isFieldsValidate();

        if (!isValidForm) {
            NotifyUtil.error(NotificationConstant.TITLE, NotificationConstant.ERROR_MESSAGE_UTIL);
            return;
        }

        const formValues = formRef.current?.getFieldsValue();

        if (formValues?.expiredDate < formValues?.effectDate) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Ngày kết thúc hợp đồng phải lớn hơn ngày hiệu lực');
            return;
        }

        if (formValues?.month <= 0) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Số tháng phải lớn hơn 0');
            return;
        }

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
        props.mask?.();
        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,
            roomId: props.roomId,
            customerId: props.customer?.id,
        });

        if (response.data?.success) {
            await callback?.();
            props.unMask?.();

            NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
            props?.onSubmitSuccessfully?.();

            props.onClose?.();
            return;
        } else {
            props.unMask?.();
        }
    };

    const onExport = async () => {
        const isValidForm = await formRef.current?.isFieldsValidate();

        if (!isValidForm) {
            NotifyUtil.error(NotificationConstant.TITLE, NotificationConstant.ERROR_MESSAGE_UTIL);
            return;
        }

        const formValues = formRef.current?.getFieldsValue();
        if (formValues?.expiredDate < formValues?.effectDate) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Ngày kết thúc hợp đồng phải lớn hơn ngày hiệu lực');
            return;
        }

        if (formValues?.month <= 0) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Số tháng phải lớn hơn 0');
            return;
        }

        props.mask?.();

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
        props.unMask?.();
    };

    useImperativeHandle(
        ref,
        () => ({
            onSave: onSubmit,
            onExport: onExport,
            onSaveAndExport: async () => {
                await onSubmit(() => onExport());
            },
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
                        children: <Input readOnly disabled placeholder="Nhập sô hợp đồng ..." />,
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
                                onChange={(value: any) => {
                                    console.log(value);
                                    const contractNumber = genContractNumber(value, props?.roomCode ?? '');
                                    formRef.current?.setFieldsValue({ contractNumber: contractNumber });
                                }}
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
                                onChange={(val: any) => {
                                    const formValue = formRef.current?.getFieldsValue() as Contract;
                                    if (formValue.month) {
                                        const expiredDate = moment(val).add(formValue.month, 'months');
                                        formRef.current?.setFieldsValue({ expiredDate: expiredDate });
                                    }
                                }}
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
                                    if (val <= 0)
                                        return NotifyUtil.error(NotificationConstant.TITLE, 'Số tháng phải lớn hơn 0');
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
        </AppModalContainer>
    );
});

export default ContractForm;

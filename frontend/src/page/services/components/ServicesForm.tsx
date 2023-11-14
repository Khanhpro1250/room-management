import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Input, Select, Switch } from 'antd';
import { Method } from 'axios';
import React, { useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { Service } from '~/types/shared/Service';
import { Role } from '~/types/ums/Role';
import NotifyUtil from '~/util/NotifyUtil';
import { SERVICE_CREATE_API, SERVICE_UPDATE_API } from '../api/services.api';

interface Props {
    initialValues?: Partial<Service>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

const ServicesForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);

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
                url: SERVICE_CREATE_API,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${SERVICE_UPDATE_API}/${props.initialValues?.id}`,
                method: 'put',
                message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
            },
        };

        const urlParam = props.initialValues ? urlParams.update : urlParams.create;

        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,
            unit: JSON.stringify(formValues?.unit),
        });

        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
            props?.onSubmitSuccessfully?.();
            props.onClose?.();
            return;
        }
    };

    return (
        <AppModalContainer>
            <BaseForm
                initialValues={{
                    ...props.initialValues,
                    unit: props.initialValues?.unit ? JSON.parse(props.initialValues?.unit) : [],
                }}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Tên dịch vụ',
                        name: nameof.full<Service>(x => x.name),
                        children: <Input placeholder="Nhập tên dịch vụ ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Code',
                        name: nameof.full<Service>(x => x.code),
                        children: <Input placeholder="Nhập mã dịch vụ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Loại dịch vụ',
                        name: nameof.full<Service>(x => x.type),
                        children: (
                            <Select
                                options={[
                                    { value: 'DIEN', label: 'Điện' },
                                    { value: 'NUOC', label: 'Nước' },
                                    { value: 'KHAC', label: 'Khác' },
                                ]}
                                placeholder="Chọn loại dịch vụ ..."
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Đơn vị tính',
                        name: nameof.full<Service>(x => x.unit),
                        children: (
                            <Select
                                options={[
                                    { value: 'kW/h', label: 'kW/h' },
                                    { value: 'cm3', label: 'Khối' },
                                ]}
                                placeholder="Chọn đơn vị tính ..."
                                optionLabelProp="label"
                                mode="tags"
                                onChange={(value: any[]) => {
                                    if (value.length > 1) {
                                        value.shift();
                                    }
                                }}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Đơn giá',
                        name: nameof.full<Service>(x => x.price),
                        children: <Input addonAfter="VND" placeholder="Nhập đơn giá ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Trạng thái',
                        name: nameof.full<Service>(x => x.status),
                        valuePropName: 'checked',
                        children: <Switch defaultChecked />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                ]}
                labelAlign="left"
                labelCol={4}
                renderBtnBottom={() => {
                    return (
                        <div className="flex items-center justify-center w-full">
                            <ButtonBase title="Lưu" startIcon={faSave} onClick={onSubmit} />
                            <ButtonBase title="Đóng" startIcon={faClose} variant="danger" onClick={props.onClose} />
                        </div>
                    );
                }}
            />
        </AppModalContainer>
    );
};

export default ServicesForm;

import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input, Radio, Select } from 'antd';
import { Method } from 'axios';
import { useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { Room } from '~/types/shared';

import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import TextArea from 'antd/lib/input/TextArea';
import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';
import { CUSTOMER_CREATE_API, CUSTOMER_UPDATE_API } from '../api/customer.api';
import { Customer } from '~/types/shared/Customer';
interface Props {
    parentId?: string;
    readonly?: boolean;
    initialValues?: Partial<Room>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}
const CustomerForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
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
            houseId: props.parentId,
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
    return (
        <AppModalContainer>
            <BaseForm
                disabled={props.readonly}
                initialValues={props.initialValues}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Họ và tên',
                        name: nameof.full<Customer>(x => x.fullName),
                        children: <Input disabled={props.readonly} placeholder="Nhập họ và tên ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Giới tính',
                        name: nameof.full<Customer>(x => x.gender),
                        children: (
                            <Radio.Group defaultValue={1}>
                                <Radio value={1}>Nam</Radio>
                                <Radio value={2}>Nữ</Radio>
                            </Radio.Group>
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'CMND/CCCD',
                        name: nameof.full<Customer>(x => x.identityNo),
                        children: <Input disabled={props.readonly} placeholder="Nhập CMND/CCCD ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },

                    {
                        label: 'Ngày cấp',
                        name: nameof.full<Customer>(x => x.issueDate),
                        children: (
                            <DatePicker
                                className="w-full"
                                disabled={props.readonly}
                                placeholder="Ngày cấp"
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },

                    {
                        label: 'Số điện thoại 1',
                        name: nameof.full<Customer>(x => x.phoneNumber1),
                        children: (
                            <Input className="w-full" disabled={props.readonly} placeholder="Nhập số điện thoại 1" />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Nơi cấp',
                        name: nameof.full<Customer>(x => x.issuePlace),
                        children: <Input disabled={props.readonly} placeholder="Nhập nơi cấp" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Số điện thoại 2',
                        name: nameof.full<Customer>(x => x.phoneNumber2),
                        children: <Input disabled={props.readonly} placeholder="Nhập số điện thoại 2" />,
                        className: 'col-span-6',
                    },
                    {
                        label: 'Email',
                        name: nameof.full<Customer>(x => x.email),
                        children: <Input disabled={props.readonly} placeholder="Nhập nơi cấp" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Địa chỉ thường trú',
                        name: nameof.full<Customer>(x => x.permanentAddress),
                        children: <Input disabled={props.readonly} placeholder="Nhập địa chỉ thường trú" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày sinh',
                        name: nameof.full<Customer>(x => x.birthday),
                        children: (
                            <DatePicker
                                className="w-full"
                                disabled={props.readonly}
                                placeholder="Ngày sinh"
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Nơi sinh',
                        name: nameof.full<Customer>(x => x.birthPlace),
                        children: <Input disabled={props.readonly} placeholder="Nhập nơi sinh" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Tiền phòng',
                        name: nameof.full<Customer>(x => x.roomCharge),
                        children: <Input addonAfter="VND" disabled={props.readonly} placeholder="Nhập tiền phòng" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày thuê',
                        name: nameof.full<Customer>(x => x.rentalStartTime),
                        children: (
                            <DatePicker
                                className="w-full"
                                disabled={props.readonly}
                                placeholder="Ngày thuê"
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Đặt cọc',
                        name: nameof.full<Customer>(x => x.deposit),
                        children: <Input addonAfter="VND" disabled={props.readonly} placeholder="Nhập tiền cọc" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Kỳ thanh toán',
                        name: nameof.full<Customer>(x => x.paymentPeriod),
                        children: (
                            <Select
                                defaultValue="15"
                                // onChange={handleChange}
                                options={[
                                    { value: '15', label: 'Ngày 15' },
                                    { value: '30', label: 'Ngày 30' },
                                ]}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Thanh toán mỗi lần',
                        name: nameof.full<Customer>(x => x.paymentOneTime),
                        children: (
                            <div className="flex">
                                <Select
                                    defaultValue="1"
                                    // onChange={handleChange}
                                    options={[
                                        { value: 1, label: '1 Tháng' },
                                        { value: 2, label: '2 Tháng' },
                                        { value: 3, label: '3 Tháng' },
                                        { value: 4, label: '4 Tháng' },
                                        { value: 5, label: '5 Tháng' },
                                        { value: 6, label: '6 Tháng' },
                                        { value: 12, label: '12 Tháng' },
                                    ]}
                                />
                                <div className="w-[57px] h-[32px] border-[1px] border-gray-300 bg-gray-50 text-center items-center pt-1">
                                    Tháng
                                </div>
                            </div>
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Số xe',
                        name: nameof.full<Customer>(x => x.vehicleNumber),
                        children: <Input disabled={props.readonly} placeholder="Nhập số xe" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ghi chú',
                        name: nameof.full<Customer>(x => x.vehicleNumber),
                        children: <TextArea disabled={props.readonly} placeholder="Nhập ghi chú" />,
                        className: 'col-span-6',
                    },
                ]}
                labelAlign="left"
                isDisplayGrid={true}
                labelWidth={150}
                renderBtnBottom={() => {
                    return (
                        <div className="flex items-center justify-center w-full">
                            {!props.readonly && (
                                <ButtonBase title="Lưu" size="md" startIcon={faSave} onClick={onSubmit} />
                            )}
                            <ButtonBase
                                title="Đóng"
                                size="md"
                                startIcon={faClose}
                                variant="danger"
                                onClick={props.onClose}
                            />
                        </div>
                    );
                }}
            />
            <Overlay ref={overlayRef} />
        </AppModalContainer>
    );
};

export default CustomerForm;

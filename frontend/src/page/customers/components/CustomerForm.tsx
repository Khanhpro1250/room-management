import { DatePicker, Input, Radio } from 'antd';
import { Method } from 'axios';
import React, { useImperativeHandle, useRef } from 'react';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { Room } from '~/types/shared';

import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import moment from 'moment';
import ImagePickerField from '~/component/Elements/ImagePreview/ImagePickerField';
import { requestApi } from '~/lib/axios';
import { Customer } from '~/types/shared/Customer';
import ApiUtil from '~/util/ApiUtil';
import NotifyUtil from '~/util/NotifyUtil';
import { CUSTOMER_CREATE_API, CUSTOMER_UPDATE_API } from '../api/customer.api';
interface Props {
    parentId?: string | null;
    readonly?: boolean;
    initialValues?: Partial<Customer>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    mask?: () => void;
    unMask?: () => void;
}

export interface CustomerFormRef {
    onSave: () => void;
    isValid: () => void;
}
const CustomerForm = React.forwardRef<CustomerFormRef, Props>((props, ref): JSX.Element => {
    const formRef = useRef<BaseFormRef>(null);

    const cloneRowData = _.cloneDeep(props.initialValues);

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
        if (!formRef.current?.isFieldsValidate()) {
            return;
        }
        const formValues = formRef.current?.getFieldsValue();
        const formBody = {
            ...formValues,
        };

        if (!_.isEmpty(props.initialValues)) {
            const initFiles = cloneRowData?.fileEntryCollection;

            const [listFileRemaining, newFiles] = _.partition(
                formBody.fileEntryCollection,
                (x: any) => !(x instanceof File),
            );

            const listFileRemainingIds = _.map(listFileRemaining, (x: any) => x.id) || [];
            const listDeletedFiles = _.filter(initFiles?.fileEntries, (x: any) => !listFileRemainingIds.includes(x.id));
            const listDeletedFileIds = _.map(listDeletedFiles, (x: any) => x.id);

            _.set(formBody, 'listDeletedFileIds', listDeletedFileIds.toString());
            _.set(formBody, 'fileEntryCollection', newFiles);
        }

        const data = ApiUtil.createFormMultipartForNet({
            ...formBody,
            roomId: props?.parentId,
            issueDate: moment(formBody?.issueDate).format('YYYY-MM-DD'),
            rentalStartTime: moment(formBody?.rentalStartTime).format('YYYY-MM-DD'),
            birthday: moment(formBody?.birthday).format('YYYY-MM-DD'),
        });

        const urlParam = props.initialValues ? urlParams.update : urlParams.create;
        props.mask?.();
        const response = await requestApi(urlParam.method, urlParam.url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
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

    useImperativeHandle(
        ref,
        () => ({
            onSave: onSubmit,
            isValid() {
                return formRef.current?.isFieldsValidate();
            },
        }),
        [],
    );

    const initialValues = {
        ...props.initialValues,
        genders: props.initialValues?.gender ?? 1,
        issueDate: props.initialValues?.issueDate ? moment(props.initialValues?.issueDate) : null,
        rentalStartTime: props.initialValues?.rentalStartTime ? moment(props.initialValues?.rentalStartTime) : null,
        birthday: props.initialValues?.birthday ? moment(props.initialValues?.birthday) : null,
        fileEntryCollection: props.initialValues?.fileEntryCollection
            ? props.initialValues?.fileEntryCollection?.fileEntries?.map(file => ({
                  id: file.id,
                  name: file.fileName,
                  status: 'done',
                  url: file.url,
              }))
            : [],
    };
    return (
        <AppModalContainer>
            <BaseForm
                disabled={props.readonly}
                initialValues={initialValues}
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
                        label: 'Số xe',
                        name: nameof.full<Customer>(x => x.vehicleNumber),
                        children: <Input disabled={props.readonly} placeholder="Nhập số xe" />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ghi chú',
                        name: nameof.full<Customer>(x => x.note),
                        children: <TextArea disabled={props.readonly} placeholder="Nhập ghi chú" />,
                        className: 'col-span-6',
                    },
                    {
                        label: 'Hình ảnh CCCD',
                        name: nameof.full<Customer>(x => x.fileEntryCollection),
                        children: (
                            <ImagePickerField
                                formRef={formRef}
                                initialValue={initialValues.fileEntryCollection}
                                name={nameof.full<Room>(x => x.fileEntryCollection)}
                            />
                        ),
                        className: 'col-span-6',
                    },
                ]}
                labelAlign="left"
                isDisplayGrid={true}
                labelWidth={150}
            />
            <div>
                <div>
                    <span className="font-bold">Lưu ý:</span> <br />- Kỳ thanh toán tùy thuộc vào từng khu nhà trọ, nếu
                    khu trọ bạn thu tiền 1 lần vào cuối tháng thì bạn chọn là kỳ 30. Trường hợp khu nhà trọ bạn có số
                    lượng phòng nhiều, chia làm 2 đợt thu, bạn dựa vào ngày vào của khách để gán kỳ cho phù hợp, ví dụ:
                    vào từ ngày 1 đến 15 của tháng thì gán kỳ 15; nếu vào từ ngày 16 đến 31 của tháng thì gán kỳ 30. Khi
                    tính tiền phòng bạn sẽ tính tiền theo kỳ. <br />
                    - Tiền đặt cọc sẽ không tính vào doanh thu ở các báo cáo và thống kê doanh thu. Nếu bạn muốn tính
                    vào doanh thu bạn ghi nhận vào trong phần thu/chi khác (phát sinh). Tiền đặt cọc sẽ được trừ ra khi
                    tính tiền trả phòng.
                    <br />
                    - Các thông tin có giá trị là ngày nhập đủ ngày tháng năm và đúng định dạng dd/MM/yyyy (ví dụ:
                    01/12/2020)
                    <br />
                    - Thanh toán mỗi lần: Nhập 1,2,3 ; là số tháng được tính trên mỗi hóa đơn.
                    <br />
                </div>
                <div>
                    <span className="text-red-500 font-bold">(*): Thông tin bắt buộc</span>
                </div>
            </div>
        </AppModalContainer>
    );
});

export default CustomerForm;

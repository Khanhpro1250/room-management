import React, { useImperativeHandle } from 'react';
import { faClose, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input, Radio, Select, Upload, UploadFile, UploadProps } from 'antd';
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
import { UPLOAD_FILE_API } from '~/configs';
import { useMergeState } from '~/hook/useMergeState';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import FileUtil from '~/util/FileUtil';
import { RcFile } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import moment from 'moment';
interface Props {
    parentId?: string | null;
    readonly?: boolean;
    initialValues?: Partial<Customer>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

type State = {
    imageList: UploadFile[];
    fileUrls: string[];
};

export interface CustomerFormRef {
    onSave: () => void;
}
const CustomerForm = React.forwardRef<CustomerFormRef, Props>((props, ref): JSX.Element => {
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const [state, setState] = useMergeState<State>({
        imageList:
            props.initialValues?.fileUrls?.map(
                url =>
                    ({
                        uid: url,
                        name: url,
                        url: url,
                        status: 'done',
                        thumbUrl: url,
                    } as UploadFile),
            ) ?? [],
        fileUrls: props.initialValues?.fileUrls ?? [],
    });

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
            roomId: props?.parentId,
            fileUrls: state.fileUrls,
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

    const handleChange: UploadProps['onChange'] = ({ fileList, file }) => {
        if (file.status === 'done') {
            const result = _.get(file.response, 'result');
            setState({
                fileUrls: [...state.fileUrls, result.fileUrl],
                // imageList: fileList
            });
        }
        setState({ imageList: fileList });
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await FileUtil.getBase64(file.originFileObj as RcFile);
        }

        modalRef?.current?.onOpen(
            <img alt="example" style={{ width: '100%' }} src={file.url || (file.preview as string)} />,
            'Xem trước',
            '50%',
            faImage,
        );
    };

    const onRemove = (file: UploadFile) => {
        const fileUrl = file.url ? file.url : _.get(file.response, 'fileUrl');
        setState({ fileUrls: state.fileUrls.filter(url => url !== fileUrl) });
    };

    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );

    useImperativeHandle(
        ref,
        () => ({
            onSave: onSubmit,
        }),
        [],
    );

    const handleCancel = () => modalRef.current?.onClose();
    return (
        <AppModalContainer>
            <BaseForm
                disabled={props.readonly}
                initialValues={{
                    ...props.initialValues,
                    issueDate: moment(props.initialValues?.issueDate),
                    rentalStartTime: moment(props.initialValues?.rentalStartTime),
                    birthday: moment(props.initialValues?.birthday),
                }}
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
                            <Input
                                readOnly
                                className="w-full"
                                disabled={props.readonly}
                                placeholder="Nhập số điện thoại 1"
                            />
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
                            <Select
                                defaultValue={1}
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
                    {
                        label: 'Hình ảnh CCCD',
                        name: nameof.full<Customer>(x => x.fileUrls),
                        children: (
                            <>
                                <Upload
                                    onChange={handleChange}
                                    fileList={state.imageList}
                                    onRemove={onRemove}
                                    action={UPLOAD_FILE_API}
                                    accept="image/*"
                                    name="file"
                                    showUploadList={true}
                                    onPreview={handlePreview}
                                    method="post"
                                    listType="picture-card"
                                >
                                    {state.imageList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <ModalBase
                                    ref={modalRef}
                                    footer={[
                                        <div key="close" className="w-full flex items-center justify-center">
                                            <ButtonBase
                                                title="Đóng"
                                                startIcon={faClose}
                                                variant="danger"
                                                onClick={handleCancel}
                                            />
                                        </div>,
                                    ]}
                                />
                            </>
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
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
            <Overlay ref={overlayRef} />
        </AppModalContainer>
    );
});

export default CustomerForm;

import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input, Select } from 'antd';
import { Method } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { ComboOption, House } from '~/types/shared';
import NotifyUtil from '~/util/NotifyUtil';
import { CREATE_DEPOSIT_API, UPDATE_DEPOSIT_API } from '../api/deposit.api';
import { DepositDto } from '../type/deposit';
import { useRoomCombo } from '~/page/room/api/useRoomCombo';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import CustomInputNumber from '~/component/Form/CustomInputNumber';

interface Props {
    parentId?: string;
    readonly?: boolean;
    initialValues?: any;
    isCreate: boolean;
    houseCombo: ComboOption<string>[];
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}
const DepositForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);

    const { data: roomComboResponse, isFetching: isLoadingRoomCombo } = useRoomCombo(undefined, {
        isComboDeposit: true,
        roomId: props.initialValues?.roomId,
    });
    const roomCombo = useMemo(() => roomComboResponse?.data?.result ?? [], [isLoadingRoomCombo]);

    const [roomCombos, setRoomCombos] = useState(roomCombo);

    const setRoomCombo = (houseId: string) => {
        const roomCombo = roomComboResponse?.data?.result ?? [];
        if (houseId === 'All') {
            setRoomCombos(roomCombo);
            return;
        }
        const newRoomCombo = roomCombo.filter(x => x.houseId === houseId);
        formRef.current?.setFieldsValue({ roomId: null });
        setRoomCombos(newRoomCombo);
    };

    useEffect(() => {
        setRoomCombos(roomCombo);
    }, [roomCombo]);

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
                url: CREATE_DEPOSIT_API,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${UPDATE_DEPOSIT_API}/${props.initialValues?.id}`,
                method: 'put',
                message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
            },
        };
        const formValues = formRef.current?.getFieldsValue();
        const urlParam = props.initialValues ? urlParams.update : urlParams.create;

        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,
        });

        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
            props?.onSubmitSuccessfully?.();
            props.onClose?.();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Có lỗi xảy ra');
            props.onClose?.();
            return;
        }
    };
    return (
        <AppModalContainer>
            <BaseForm
                disabled={props.readonly}
                initialValues={{
                    ...props.initialValues,
                    depositDate: moment(props.initialValues?.expectedDate),
                    expectedDate: moment(props.initialValues?.depositDate),
                }}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Nhà',
                        name: 'houseId',
                        initialValue: 'All',
                        children: (
                            <Select
                                onChange={value => setRoomCombo(value)}
                                placeholder="Chọn nhà ..."
                                options={[
                                    {
                                        value: 'All',
                                        label: 'Tất cả',
                                    },
                                    ...props.houseCombo,
                                ]}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Phòng',
                        name: nameof.full<DepositDto>(x => x.roomId),
                        children: <Select placeholder="Chọn phòng ..." options={[...roomCombos]} />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Họ và tên',
                        name: nameof.full<DepositDto>(x => x.customerName),
                        children: <Input placeholder="Nhập tên khách thuê ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày đặt',
                        name: nameof.full<DepositDto>(x => x.depositDate),
                        initialValue: moment(),
                        children: <DatePicker className="w-full" format={'DD/MM/YYYY'} />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Số điện thoại',
                        name: nameof.full<DepositDto>(x => x.phoneNumber),
                        children: <Input placeholder="Nhập số điện thoại ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Đặt cọc',
                        name: nameof.full<DepositDto>(x => x.depositAmount),
                        children: (
                            <CustomInputNumber addonAfter="VND" disabled={props.readonly} placeholder="Nhập tiền cọc" />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày dự kiến đến',
                        name: nameof.full<DepositDto>(x => x.expectedDate),
                        children: <DatePicker className="w-full" format={'DD/MM/YYYY'} />,
                        className: 'col-span-6',
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Ghi chú',
                        name: nameof.full<DepositDto>(x => x.note),
                        children: <TextArea disabled={props.readonly} placeholder="Nhập ghi chú" />,
                        className: 'col-span-12',
                    },
                ]}
                renderBtnBottom={() => {
                    return (
                        <div className="flex items-center justify-center w-full">
                            {!props.readonly && (
                                <ButtonBase title="Lưu" size="md" startIcon={faSave} onClick={onSubmit} />
                            )}
                            <ButtonBase
                                title="Đóng"
                                startIcon={faClose}
                                size="md"
                                variant="danger"
                                onClick={props.onClose}
                            />
                        </div>
                    );
                }}
                labelAlign="left"
                isDisplayGrid={true}
                labelWidth={150}
            />
        </AppModalContainer>
    );
};

export default DepositForm;

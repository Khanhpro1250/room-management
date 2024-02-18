import { faClose, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Select } from 'antd';
import { Method } from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { useRoomCombo } from '~/page/room/api/useRoomCombo';
import { Service } from '~/types/shared/Service';
import NotifyUtil from '~/util/NotifyUtil';
import { CalculateRequestDto } from '../types/calculate';
import { CALCULATE_CALCULATE_CHARGE, UPDATE_CALCULATE_CHARGE } from '../api/calculate.api';
import { ComboOption } from '~/types/shared';
import moment from 'moment';

interface Props {
    initialValues?: Partial<Service>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    houseCombo: ComboOption<string>[];
}

const CalculateMoneyForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);

    const { data: roomComboResponse, isFetching: isLoadingRoomCombo } = useRoomCombo(undefined);
    const roomCombo = useMemo(() => roomComboResponse?.data?.result ?? [], [isLoadingRoomCombo]);

    const [roomCombos, setRoomCombos] = useState(roomCombo);

    const setRoomCombo = (houseId: string) => {
        const roomCombo = roomComboResponse?.data?.result ?? [];
        if (houseId === 'All') {
            setRoomCombos(roomCombo);
            return;
        }
        const newRoomCombo = roomCombo.filter(x => x.houseId === houseId);
        formRef.current?.setFieldsValue({ roomId: 'All' });
        setRoomCombos(newRoomCombo);
    };

    useEffect(() => {
        setRoomCombos(roomCombo);
    }, [roomCombo]);

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
                url: CALCULATE_CALCULATE_CHARGE,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${UPDATE_CALCULATE_CHARGE}/${props.initialValues?.id}`,
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
                    status: props.initialValues?.status ?? true,
                    unit: props.initialValues?.unit ? JSON.parse(props.initialValues?.unit) : [],
                }}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Ngày',
                        name: nameof.full<CalculateRequestDto>(x => x.dateCalculate),
                        initialValue: moment(),
                        children: <DatePicker className="w-full" format={'DD/MM/YYYY'} />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Nhà',
                        name: nameof.full<CalculateRequestDto>(x => x.houseId),
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
                    },
                    {
                        label: 'Phòng',
                        name: nameof.full<CalculateRequestDto>(x => x.roomId),
                        initialValue: 'All',
                        children: (
                            <Select
                                placeholder="Chọn phòng ..."
                                options={[
                                    {
                                        value: 'All',
                                        label: 'Tất cả',
                                    },
                                    ...roomCombos,
                                ]}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                ]}
                labelAlign="left"
                labelCol={4}
                renderBtnBottom={() => {
                    return (
                        <div className="flex items-center justify-center w-full">
                            <ButtonBase title="Tính tiền" startIcon={faMoneyBill} onClick={onSubmit} />
                            <ButtonBase title="Đóng" startIcon={faClose} variant="danger" onClick={props.onClose} />
                        </div>
                    );
                }}
            />
        </AppModalContainer>
    );
};

export default CalculateMoneyForm;

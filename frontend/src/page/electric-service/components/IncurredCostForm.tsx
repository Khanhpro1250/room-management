import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Select } from 'antd';
import { Method } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { ComboOption } from '~/types/shared';

import TextArea from 'antd/lib/input/TextArea';
import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';
import CustomInputNumber from '~/component/Form/CustomInputNumber';
import { requestApi } from '~/lib/axios';
import { useRoomCombo } from '~/page/room/api/useRoomCombo';
import NotifyUtil from '~/util/NotifyUtil';
import { CREATE_INCURRED_API, UPDATE_INCURRED_API } from '../api/electric-service.api';
import { IncurredCost, IncurredCostType } from '../type/electic-service';
import moment from 'moment';

interface Props {
    id?: string;
    readonly?: boolean;
    initialValues?: any;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    houseCombo: ComboOption<string>[];
}

const IncurredCostForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);

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

        const urlParams: Record<
            string,
            {
                url: string;
                method: Method;
                message: string;
            }
        > = {
            create: {
                url: CREATE_INCURRED_API,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${UPDATE_INCURRED_API}/${props.initialValues?.id}`,
                method: 'put',
                message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
            },
        };
        const formValues = formRef.current?.getFieldsValue();

        const urlParam = props.initialValues ? urlParams.update : urlParams.create;
        overlayRef.current?.open();
        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,
            date: formValues?.date?.format('YYYY-MM-DD'),
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

    const initialValues = {
        ...props.initialValues,
        date: props.initialValues?.date ? moment(props.initialValues?.date) : undefined,
    };

    return (
        <AppModalContainer loading={isLoadingRoomCombo}>
            <BaseForm
                disabled={props.readonly}
                initialValues={initialValues}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Nhà',
                        name: nameof.full<IncurredCost>(x => x.houseId),
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
                        name: nameof.full<IncurredCost>(x => x.roomId),
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
                    {
                        label: 'Tháng/năm',
                        name: nameof.full<IncurredCost>(x => x.date),
                        children: (
                            <DatePicker
                                className="w-full"
                                disabled={props.readonly}
                                placeholder="Chọn thời gian"
                                format={'MM/yyyy'}
                                picker="month"
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Người chi trả',
                        name: nameof.full<IncurredCost>(x => x.type),
                        initialValue: IncurredCostType.Owner,
                        children: (
                            <Select
                                placeholder="Chọn người chi trả"
                                options={[
                                    {
                                        value: IncurredCostType.Owner,
                                        label: 'Chủ nhà trả',
                                    },
                                    {
                                        value: IncurredCostType.Customer,
                                        label: 'Khách thuê trả',
                                    },
                                ]}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Số tiền',
                        name: nameof.full<IncurredCost>(x => x.cost),
                        children: (
                            <CustomInputNumber disabled={props.readonly} placeholder="Nhập số tiền phát sinh ..." />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Mô tả',
                        name: nameof.full<IncurredCost>(x => x.description),
                        children: <TextArea disabled={props.readonly} placeholder="Nhập mô tả chi phí phát sinh ..." />,
                    },
                ]}
                labelAlign="left"
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

export default IncurredCostForm;

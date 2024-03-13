import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { DatePicker } from 'antd';
import { Method } from 'axios';
import moment from 'moment';
import React, { useMemo, useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import CustomInputNumber from '~/component/Form/CustomInputNumber';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { Service } from '~/types/shared/Service';
import NotifyUtil from '~/util/NotifyUtil';
import { CALCULATE_CALCULATE_CHARGE, UPDATE_CALCULATE_CHARGE } from '../api/calculate.api';
import { CollectMoneyDto } from '../types/calculate';

interface Props {
    initialValues?: any;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

const CollectMoneyForm: React.FC<Props> = props => {
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
                    dateCollectMoney: props.initialValues?.lastDateCollectMoney
                        ? moment(props.initialValues?.lastDateCollectMoney)
                        : moment(),
                    moneyCollect: props.initialValues?.totalUnpaid ?? 0,
                }}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Ngày',
                        name: nameof.full<CollectMoneyDto>(x => x.dateCollectMoney),

                        children: <DatePicker className="w-full" format={'DD/MM/YYYY'} />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Số tiền',
                        name: nameof.full<CollectMoneyDto>(x => x.moneyCollect),
                        children: <CustomInputNumber addonAfter="VND" placeholder="Nhập số tiền" min={0} />,
                        className: 'col-span-6',
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

export default CollectMoneyForm;

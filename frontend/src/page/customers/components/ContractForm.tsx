import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { DatePicker, Input } from 'antd';
import { Method } from 'axios';
import moment from 'moment';
import React, { useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import { Contract } from '~/types/shared/Contract';
import { Customer } from '~/types/shared/Customer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import NotifyUtil from '~/util/NotifyUtil';



interface Props {
    initialValues?: Partial<Contract>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
    customer?: Customer;
    roomId?: string;
}

const ContractForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);

    const onSubmit = async () => {
        // const isValidForm = await formRef.current?.isFieldsValidate();

        // if (!isValidForm) {
        //     NotifyUtil.error(NotificationConstant.TITLE, NotificationConstant.ERROR_MESSAGE_UTIL);
        //     return;
        // }

        // const formValues = formRef.current?.getFieldsValue();

        // const urlParams: Record<
        //     string,
        //     {
        //         url: string;
        //         method: Method;
        //         message: string;
        //     }
        // > = {
        //     create: {
        //         url: Contract_CREATE_API,
        //         method: 'post',
        //         message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
        //     },
        //     update: {
        //         url: `${Contract_UPDATE_API}/${props.initialValues?.id}`,
        //         method: 'put',
        //         message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
        //     },
        // };

        // const urlParam = props.initialValues ? urlParams.update : urlParams.create;

        // const response = await requestApi(urlParam.method, urlParam.url, {
        //     ...formValues,
        // });

        // if (response.data?.success) {
        //     NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
        //     props?.onSubmitSuccessfully?.();
        //     props.onClose?.();
        //     return;
        // }
    };

    return (
        <AppModalContainer>
            <BaseForm
                initialValues={props.initialValues}
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
                                value={props.customer?.createdTime ? moment(props.customer?.createdTime) : null}
                                placeholder='Ngày ký hợp đồng'
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
                                value={props.customer?.createdTime ? moment(props.customer?.createdTime) : null}
                                placeholder='Ngày hiệu lực'
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                    {
                        label: 'Số tháng',
                        name: nameof.full<Contract>(x => x.month),
                        children: <Input />,
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
                                placeholder='Ngày kết thúc hợp đồng'
                                format={'DD/MM/YYYY'}
                            />
                        ),
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }], 
                        className: 'col-span-6',

                    },
                    {
                        label: 'Ngày kết thúc hợp đồng',
                        name: '',
                        children: (
                            <ReactQuill theme="snow"onChange={(value:string,delta)=> {
                                console.log(delta,value)
                            }} />
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
};

export default ContractForm;
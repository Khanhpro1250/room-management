import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
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
                        name: nameof.full<Room>(x => x.roomCode),
                        children: <Input disabled={props.readonly} placeholder="Nhập họ và tên ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                        className: 'col-span-6',
                    },
                ]}
                labelAlign="left"
                isDisplayGrid={true}
                labelCol={4}
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

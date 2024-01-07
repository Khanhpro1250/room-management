import { faPaperPlane, faSave } from '@fortawesome/free-solid-svg-icons';
import { Form, FormInstance, Input } from 'antd';
import { useRef } from 'react';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { ButtonBase } from '../Elements/Button/ButtonBase';
import Overlay, { OverlayRef } from '../Elements/loading/Overlay';

interface Props {
    data: Record<string, any>;
    api: string;
    apiResent: string;
    message: string;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}
const OTPForm: React.FC<Props> = props => {
    const formRef = useRef<FormInstance>(null);
    const overlayRef = useRef<OverlayRef>(null);

    const onSubmit = async () => {
        overlayRef.current?.open();
        const formValues = formRef.current?.getFieldsValue();
        const response = await requestApi('post', props.api, {
            ...formValues,
            data: props.data,
        });

        if (response.data?.success) {
            overlayRef.current?.close();
            NotifyUtil.success(NotificationConstant.TITLE, props.message);
            props?.onSubmitSuccessfully?.();
            props.onClose?.();
            return;
        } else {
            overlayRef.current?.close();
            NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Có lỗi xảy ra');
            props.onClose?.();
            return;
        }
    };

    const onResentOtp = async () => {
        overlayRef.current?.open();
        const response = await requestApi('post', props.apiResent, {
            ...props.data,
        });
        if (response.data?.success) {
            overlayRef.current?.close();
            NotifyUtil.success(NotificationConstant.TITLE, 'Gửi lại mã thành công ');
            props.onClose?.();
            return;
        } else {
            overlayRef.current?.close();
            NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Có lỗi xảy ra');
            props.onClose?.();
            return;
        }
    };
    return (
        <AppModalContainer>
            <Form ref={formRef}>
                <Form.Item required name={'otpCode'}>
                    <Input size="large" type="number" maxLength={6} placeholder="Nhập mã otp..." className="mb-6" />
                </Form.Item>
                <div className="flex items-center justify-center w-full">
                    <ButtonBase title="Lưu" size="md" startIcon={faSave} onClick={onSubmit} />
                    <ButtonBase
                        title="Gửi lại mã"
                        startIcon={faPaperPlane}
                        size="md"
                        variant="info"
                        onClick={onResentOtp}
                    />
                </div>
            </Form>
            <Overlay ref={overlayRef} />
        </AppModalContainer>
    );
};

export default OTPForm;

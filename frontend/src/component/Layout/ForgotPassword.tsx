// @flow
import { Form, FormInstance, Input } from 'antd';
import * as React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
// import bgImageUrl from '~/assets/login/background_login.png';
import _ from 'lodash';
import { Navigate } from 'react-router-dom';
import { RootState } from '~/AppStore';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { ButtonBase } from '../Elements/Button/ButtonBase';
import Overlay, { OverlayRef } from '../Elements/loading/Overlay';
import { CHANGE_PASSWORD_API, CHECK_REGISTER_API, FORGOT_API, RESENT_FORGOT_API } from '~/configs';
import OTPForm from '../Form/OTPForm';
import ModalBase, { ModalRef } from '../Modal/ModalBase';

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormInstance>(null);
    const { isAuthenticated } = useSelector((state: RootState) => state.authData);
    const overlayRef = useRef<OverlayRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const isFieldsValidate = async () => {
        return await formRef.current
            ?.validateFields()
            .then(() => true)
            .catch(() => false);
    };

    const backToLogin = () => {
        window.location.replace('/login');
    };

    const onChangePassword = async () => {
        const changePassValue = formRef.current?.getFieldsValue();
        if (await isFieldsValidate()) {
            if (
                _.isEmpty(changePassValue.password) ||
                (_.isEmpty(changePassValue.rePassword) && changePassValue.password !== changePassValue.rePassword)
            ) {
                NotifyUtil.error(NotificationConstant.TITLE, 'Password not match');
                return;
            }
            overlayRef.current?.open();
            const response = await requestApi('POST', FORGOT_API, {
                email: changePassValue.email,
                password: changePassValue.password,
            });

            if (response.data?.success) {
                overlayRef.current?.close();
                modalRef.current?.onOpen(
                    <OTPForm
                        data={{
                            email: changePassValue.email,
                            password: changePassValue.password,
                        }}
                        api={CHANGE_PASSWORD_API}
                        apiResent={RESENT_FORGOT_API}
                        message={'Đổi mật khẩu thành công'}
                        onSubmitSuccessfully={backToLogin}
                    />,
                    'Nhập mã OTP đã gửi qua email ( hiệu lực trong 5 phút )',
                    '50%',
                );
            } else {
                overlayRef.current?.close();
                NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Đổi mật khẩu thất bại');
                return;
            }
        }
    };

    if (!!isAuthenticated) {
        return <Navigate to={'/room-manage'} />;
    }

    return (
        <>
            <section className="h-screen">
                <div className="container h-full px-6 py-24">
                    <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                        <div className="mb-12 md:mb-0 md:w-7/12 lg:w-5/12">
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="Phone image"
                            />
                        </div>

                        <div className="md:w-7/12 lg:ml-6 lg:w-4/12">
                            <div className="flex justify-center mb-5">
                                <span className="text-cyan-500  text-5xl">Đổi mật khẩu</span>
                            </div>
                            <Form ref={formRef}>
                                <Form.Item required name={'email'}>
                                    <Input size="large" type="email" placeholder="Nhập email..." className="mb-4" />
                                </Form.Item>
                                <Form.Item required name={'password'}>
                                    <Input
                                        size="large"
                                        type="password"
                                        placeholder="Nhập mật khẩu mới..."
                                        className="mb-4"
                                    />
                                </Form.Item>
                                <Form.Item required name="rePassword">
                                    <Input
                                        size="large"
                                        type="password"
                                        placeholder="Nhập lại mật khẩu..."
                                        className="mb-4"
                                    />
                                </Form.Item>
                                <ButtonBase
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    title="Đổi mật khẩu"
                                    size="md"
                                    onClick={onChangePassword}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
            <ModalBase ref={modalRef} />
            <Overlay ref={overlayRef} />
        </>
    );
};

export default ForgotPassword;

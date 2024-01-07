// @flow
import { Form, FormInstance, Input } from 'antd';
import * as React from 'react';
import { useRef } from 'react';
import bgImageUrl from '~/assets/login/login_background.svg';
import { RegisterParam } from '~/types/ums/AuthUser';
import { ButtonBase } from '../Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '../Form/BaseForm';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '~/AppStore';
import { CHECK_REGISTER_API, REGISTER_API, RESENT_OTP_REGISTER_API } from '~/configs';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { ValidateUtils } from '~/util/ValidateUltil';
import ModalBase, { ModalRef } from '../Modal/ModalBase';
import OTPForm from '../Form/OTPForm';
import _ from 'lodash';
import CommonUtil from '~/util/CommonUtil';
import Overlay, { OverlayRef } from '../Elements/loading/Overlay';

const RegisterView: React.FC = () => {
    const formRef = useRef<FormInstance>(null);
    const { isAuthenticated } = useSelector((state: RootState) => state.authData);
    const modalRef = useRef<ModalRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
    const backToLogin = () => {
        window.location.replace('/login');
    };

    const isFieldsValidate = () => {
        const registerValue = formRef.current?.getFieldsValue() as RegisterParam;
        if (_.isEmpty(registerValue.fullName)) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Vui lòng nhập họ và tên');
            return false;
        }
        if (_.isEmpty(registerValue.userName)) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Vui lòng nhập email');
            return false;
        }
        if (_.isEmpty(registerValue.userName)) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Vui lòng nhập username');
            return false;
        }
        if (_.isEmpty(registerValue.password)) {
            NotifyUtil.error(NotificationConstant.TITLE, 'Vui lòng nhập mật khẩu');
            return false;
        }
        return true;
    };

    const onSave = async () => {
        const registerValue = formRef.current?.getFieldsValue() as RegisterParam;
        if (isFieldsValidate()) {
            if (registerValue.password.length < 6) {
                NotifyUtil.error(NotificationConstant.TITLE, 'Mật khẩu phải tối thiểu 6 ký tự');
                return;
            }

            if (!ValidateUtils.ValidateEmail(registerValue.emailAddress)) {
                NotifyUtil.error(NotificationConstant.TITLE, 'Email not valid');
                return;
            }
            if (!ValidateUtils.ValidatePhone(registerValue.phoneNumber)) {
                NotifyUtil.error(NotificationConstant.TITLE, 'PhoneNumber not valid');
                return;
            }

            if (
                _.isEmpty(registerValue.password) ||
                (_.isEmpty(registerValue.rePassword) && registerValue.password !== registerValue.rePassword)
            ) {
                NotifyUtil.error(NotificationConstant.TITLE, 'Password not match');
                return;
            }
            overlayRef.current?.open();
            const response = await requestApi('POST', CHECK_REGISTER_API, {
                ...registerValue,
            });

            if (response.data?.success) {
                overlayRef.current?.close();
                modalRef.current?.onOpen(
                    <OTPForm
                        data={registerValue}
                        api={REGISTER_API}
                        apiResent={RESENT_OTP_REGISTER_API}
                        message={'Đăng kí thành công'}
                        onSubmitSuccessfully={backToLogin}
                    />,
                    'Nhập mã OTP đã gửi qua email ( hiệu lực trong 5 phút )',
                    '50%',
                );
            } else {
                overlayRef.current?.close();
                NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Đăng ký thất bại');
                return;
            }
        }
    };

    if (!!isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    return (
        <>
            <section className="h-screen w-full ">
                <div className="h-full  px-6 py-24 container">
                    <div className="flex h-full flex-wrap items-center justify-center lg:justify-around">
                        <div className="mb-12 md:mb-0 md:w-7/12 lg:w-6/12 ">
                            <img
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="Phone image"
                            />
                        </div>
                        <div className="md:w-4/12 lg:w-5/12">
                            <div className="flex justify-center mb-5">
                                <span className="text-cyan-500  text-5xl">Đăng ký tài khoản</span>
                            </div>
                            <Form ref={formRef}>
                                <Form.Item required name={nameof.full<RegisterParam>(x => x.fullName)}>
                                    <Input size="large" type="email" placeholder="Nhập họ và tên..." className="mb-4" />
                                </Form.Item>
                                <Form.Item required name={nameof.full<RegisterParam>(x => x.emailAddress)}>
                                    <Input size="large" type="email" placeholder="Nhập email..." className="mb-4" />
                                </Form.Item>
                                <Form.Item required name={nameof.full<RegisterParam>(x => x.userName)}>
                                    <Input size="large" type="text" placeholder="Nhập username..." className="mb-4" />
                                </Form.Item>
                                <div className="flex justify-between gap-4">
                                    <Form.Item
                                        className="flex-1"
                                        required
                                        name={nameof.full<RegisterParam>(x => x.password)}
                                    >
                                        <Input
                                            size="large"
                                            type="password"
                                            placeholder="Nhập password..."
                                            className="mb-4"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className="flex-1"
                                        required
                                        name={nameof.full<RegisterParam>(x => x.rePassword)}
                                    >
                                        <Input
                                            size="large"
                                            type="password"
                                            placeholder="Nhập lại password..."
                                            className="mb-4"
                                        />
                                    </Form.Item>
                                </div>
                                <Form.Item required name={nameof.full<RegisterParam>(x => x.address)}>
                                    <Input size="large" type="text" placeholder="Nhập địa chỉ..." className="mb-4" />
                                </Form.Item>
                                <Form.Item required name={nameof.full<RegisterParam>(x => x.phoneNumber)}>
                                    <Input
                                        size="large"
                                        type="tel"
                                        placeholder="Nhập số điện thoại..."
                                        className="mb-4"
                                    />
                                </Form.Item>
                                <div className="mb-4 flex items-center justify-end">
                                    <a
                                        href="#!"
                                        onClick={backToLogin}
                                        className="text-cyan-600 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                        Trở về trang đăng nhập?
                                    </a>
                                </div>
                                <ButtonBase
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    title="Đăng ký "
                                    size="md"
                                    onClick={onSave}
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

export default RegisterView;

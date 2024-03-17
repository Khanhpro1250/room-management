// @flow
import { Form, FormInstance, Input } from 'antd';
import * as React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '~/AppStore';
import { loginAsync } from '~/store/authSlice';
import { LoginParam } from '~/types/ums/AuthUser';
import { ButtonBase } from '../Elements/Button/ButtonBase';
import Overlay, { OverlayRef } from '../Elements/loading/Overlay';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const LoginView: React.FC = () => {
    const dispatch = useDispatch();
    const formRef = useRef<FormInstance>(null);
    const { isAuthenticated } = useSelector((state: RootState) => state.authData);
    const overlayRef = useRef<OverlayRef>(null);
    const isFieldsValidate = async () => {
        return await formRef.current
            ?.validateFields()
            .then(() => true)
            .catch(() => false);
    };

    const onLogin = async () => {
        const isValid = await isFieldsValidate();
        if (!isValid) return;
        const loginParams = formRef.current?.getFieldsValue() as LoginParam;
        overlayRef.current?.open();
        dispatch(
            loginAsync(loginParams, () => {
                console.log('login-success!!');
                overlayRef.current?.close();
            }),
        );
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
                                <span className="text-cyan-500  text-5xl">Đăng nhập</span>
                            </div>
                            <Form ref={formRef}>
                                <Form.Item required name={nameof.full<LoginParam>(x => x.userName)}>
                                    <Input
                                        size="large"
                                        name="email"
                                        type="email"
                                        placeholder="Nhập username hoặc email..."
                                        className="mb-4"
                                    />
                                </Form.Item>
                                <Form.Item required name={nameof.full<LoginParam>(x => x.password)}>
                                    <Input.Password
                                        size="large"
                                        name="password"
                                        type="password"
                                        placeholder="Nhập password..."
                                        className="mb-4"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>
                                <div className="mb-4 flex items-center justify-end">
                                    <a
                                        href="/forgot-password"
                                        className="text-cyan-600 transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <ButtonBase
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    title="Đăng nhập"
                                    size="md"
                                    onClick={onLogin}
                                />
                                {/* <!-- Divider --> */}
                                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200 text-neutral-600">
                                        OR
                                    </p>
                                </div>
                                <ButtonBase
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    title="Đăng ký"
                                    size="md"
                                    onClick={() => window.location.replace('/register')}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
            <Overlay ref={overlayRef} />
        </>
    );
};

export default LoginView;

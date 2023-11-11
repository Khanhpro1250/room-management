// @flow
import { Input } from 'antd';
import * as React from 'react';
import { useRef } from 'react';
import bgImageUrl from '~/assets/login/login_background.svg';
import { RegisterParam } from '~/types/ums/AuthUser';
import { ButtonBase } from '../Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '../Form/BaseForm';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '~/AppStore';
import { REGISTER_API } from '~/configs';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { ValidateUtils } from '~/util/ValidateUltil';

const RegisterView: React.FC = () => {
    const formRef = useRef<BaseFormRef>(null);
    const { isAuthenticated } = useSelector((state: RootState) => state.authData);
    const backToLogin = () => {
        window.location.replace('/login');
    };
    const onSave = async () => {
        const registerValue = formRef.current?.getFieldsValue() as RegisterParam;
        if (await formRef?.current?.isFieldsValidate()) {
            if (!ValidateUtils.ValidateEmail(registerValue.emailAddress)) {
                NotifyUtil.error(NotificationConstant.TITLE, 'Email not valid');
                return;
            }
            if (!ValidateUtils.ValidatePhone(registerValue.phoneNumber)) {
                NotifyUtil.error(NotificationConstant.TITLE, 'PhoneNumber not valid');
                return;
            }
            if (registerValue.password !== registerValue.rePassword) {
                NotifyUtil.error(NotificationConstant.TITLE, 'Password not match');
                return;
            }
            const response = await requestApi('POST', REGISTER_API, {
                ...registerValue,
            });

            if (response.data?.success) {
                NotifyUtil.success(NotificationConstant.TITLE, 'Register success');
                backToLogin();
                return;
            } else {
                NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Đăng ký thất bại');
                return;
            }
        }
    };

    if (!!isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="w-full h-screen relative flex items-center justify-center">
            <img src={bgImageUrl} className="w-full h-full absolute top-0 left-0 -z-10 object-cover" alt="" />
            <div className="w-[500px] h-[470px] bg-white rounded-md shadow bg-opacity-2 p-3">
                <BaseForm
                    ref={formRef}
                    baseFormItem={[
                        {
                            label: 'Họ và tên',
                            name: nameof.full<RegisterParam>(x => x.fullName),
                            children: <Input />,
                            rules: [{ required: true }],
                        },
                        {
                            label: ' Địa chỉ email',
                            name: nameof.full<RegisterParam>(x => x.emailAddress),
                            children: <Input />,
                            rules: [{ required: true }],
                        },
                        {
                            label: 'Tài khoản',
                            name: nameof.full<RegisterParam>(x => x.userName),
                            children: <Input />,
                            rules: [{ required: true }],
                        },
                        {
                            label: 'Mật khẩu',
                            name: nameof.full<RegisterParam>(x => x.password),
                            children: <Input.Password />,
                            rules: [{ required: true }],
                        },
                        {
                            label: 'Nhập lại mật khẩu',
                            name: nameof.full<RegisterParam>(x => x.rePassword),
                            children: <Input.Password />,
                            rules: [{ required: true }],
                        },
                        {
                            label: ' Địa chỉ',
                            name: nameof.full<RegisterParam>(x => x.address),
                            children: <Input />,
                            rules: [{ required: true }],
                        },
                        {
                            label: 'Số điện thoại',
                            name: nameof.full<RegisterParam>(x => x.phoneNumber),
                            children: <Input />,
                            rules: [{ required: true }],
                        },
                    ]}
                    labelAlign="left"
                    labelCol={8}
                    className={'w-full flex items-center justify-center flex-col'}
                    width={'100%'}
                    renderBtnBottom={() => {
                        return (
                            <div>
                                <div className="flex items-center justify-center w-full">
                                    <ButtonBase className="w-[170px]" title="Đăng ký" size="md" onClick={onSave} />
                                </div>
                                <div className="flex items-center justify-center w-full mt-2">
                                    <span>
                                        Bạn đã có tài khoản ?{' '}
                                        <span
                                            className="text-blue-600 cursor-pointer hover:text-blue-400"
                                            onClick={backToLogin}
                                        >
                                            Đăng nhập
                                        </span>
                                    </span>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default RegisterView;

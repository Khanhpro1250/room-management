import { DatePicker, Input } from 'antd';
import React, { useRef } from 'react';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';

import { faSave, faUndo, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '~/AppStore';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import { BaseIcon } from '~/component/Icon/BaseIcon';
import { AppContainer } from '~/component/Layout/AppContainer';
import NotificationConstant from '~/configs/contants';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
interface Props {}

const ProfileSetting: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);
    const { authUser } = useSelector((state: RootState) => state.authData);
    const pushDomain = useNavigate();
    const renderTitle = () => {
        return (
            <div
                className="shadow-md p-3 rounded-md"
                style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}
            >
                <div>
                    <div
                        className={
                            'text-sm inline-flex items-center font-bold leading-sm ' +
                            'uppercase px-[8px] py-[5px] bg-[#73737320] text-[#737373] rounded-md mr-1'
                        }
                    >
                        <BaseIcon icon={faUserSecret} />
                    </div>
                    <span className="font-semibold text-lg">Thông tin chủ thuê</span>
                </div>
                <div className="flex">
                    <ButtonBase startIcon={faSave} variant="primary" title="Lưu" onClick={onUpdate} />
                    <ButtonBase
                        startIcon={faUndo}
                        variant="danger"
                        title="Trở lại"
                        onClick={() => {
                            pushDomain('/');
                        }}
                    />
                </div>
            </div>
        );
    };

    const onUpdate = async () => {
        const isValidForm = await formRef.current?.isFieldsValidate();

        if (!isValidForm) {
            NotifyUtil.error(NotificationConstant.TITLE, NotificationConstant.ERROR_MESSAGE_UTIL);
            return;
        }
        const formValues = formRef.current?.getFieldsValue();
        const response = await requestApi('put', `api/user/update/${authUser?.user.id}`, {
            ...formValues,
        });

        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, 'Cập nhật thông tin chủ trọ thành công');
            window.location.reload();
            return;
        }
    };

    return (
        <AppContainer title={renderTitle()} className="body-page h-full overflow-auto relative p-0">
            <BaseForm
                initialValues={{
                    ...authUser?.user,
                    issueDate: authUser?.user.issueDate ? moment(authUser?.user!.issueDate) : undefined,
                    dateOfBirth: authUser?.user.dateOfBirth ? moment(authUser?.user!.dateOfBirth) : undefined,
                }}
                className="p-4 bg-white rounded-md shadow-md h-fit"
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Họ và tên',
                        name: 'fullName',
                        children: <Input className="w-full" placeholder="Nhập họ và tên ..." />,

                        className: 'col-span-6',
                    },
                    {
                        label: 'CMND/CCCD số',
                        name: 'identityNo',
                        children: <Input placeholder="Nhập CMND/CCCD ..." />,

                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày cấp',
                        name: 'issueDate',
                        children: <DatePicker className="w-full" placeholder="Ngày cấp" format={'DD/MM/YYYY'} />,
                        className: 'col-span-6',
                    },
                    {
                        label: 'Nơi cấp',
                        name: 'issuePlace',
                        children: <Input placeholder="Nhập nơi cấp" />,

                        className: 'col-span-6',
                    },
                    {
                        label: 'Số điện thoại ',
                        name: 'phoneNumber',
                        children: <Input className="w-full" placeholder="Nhập số điện thoại 1" />,
                        className: 'col-span-6',
                    },
                    {
                        label: 'Ngày sinh',
                        name: 'dateOfBirth',
                        children: <DatePicker className="w-full" placeholder="Ngày sinh" format={'DD/MM/YYYY'} />,

                        className: 'col-span-6',
                    },
                    {
                        label: 'Email',
                        name: 'emailAddress',
                        children: <Input placeholder="Nhập nơi cấp" />,

                        className: 'col-span-6',
                    },
                    {
                        label: 'Địa chỉ',
                        name: 'address',
                        children: <Input placeholder="Nhập địa chỉ" />,

                        className: 'col-span-6',
                    },
                ]}
                labelAlign="left"
                isDisplayGrid={true}
                labelWidth={150}
            />
        </AppContainer>
    );
};

export default ProfileSetting;

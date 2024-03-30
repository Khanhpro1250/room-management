import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import { Method } from 'axios';
import { useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { House } from '~/types/shared';
import { HOUSE_CREATE_API, HOUSE_UPDATE_API } from '../api/house.api';
import { requestApi } from '~/lib/axios';
import NotifyUtil from '~/util/NotifyUtil';
import { useSelector } from 'react-redux';
import { RootState } from '~/AppStore';

interface Props {
    parentId?: string;
    readonly?: boolean;
    initialValues?: Partial<House>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}
const HomeForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);
    const { authUser } = useSelector((state: RootState) => state.authData);
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
                url: HOUSE_CREATE_API,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${HOUSE_UPDATE_API}/${props.initialValues?.id}`,
                method: 'put',
                message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
            },
        };
        const formValues = formRef.current?.getFieldsValue();
        const urlParam = props.initialValues ? urlParams.update : urlParams.create;

        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,
            userId: authUser?.user.id,
        });

        if (response.data?.success) {
            NotifyUtil.success(NotificationConstant.TITLE, urlParam.message);
            props?.onSubmitSuccessfully?.();
            props.onClose?.();
            return;
        } else {
            NotifyUtil.error(NotificationConstant.TITLE, response?.data?.message ?? 'Có lỗi xảy ra');
            props.onClose?.();
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
                        label: 'Nhà',
                        name: nameof.full<House>(x => x.name),
                        children: <Input placeholder="Nhập tên nhà ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Địa chỉ',
                        name: nameof.full<House>(x => x.location),
                        children: <Input placeholder="Nhập địa chỉ nhà ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                ]}
                labelAlign="left"
                labelCol={4}
                renderBtnBottom={() => {
                    return (
                        <div className="flex items-center justify-center w-full">
                            {!props.readonly && (
                                <ButtonBase title="Lưu" size="md" startIcon={faSave} onClick={onSubmit} />
                            )}
                            <ButtonBase
                                title="Đóng"
                                startIcon={faClose}
                                size="md"
                                variant="danger"
                                onClick={props.onClose}
                            />
                        </div>
                    );
                }}
            />
        </AppModalContainer>
    );
};

export default HomeForm;

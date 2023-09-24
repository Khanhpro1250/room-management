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
import { ROOM_CREATE_API, ROOM_UPDATE_API } from '../api/room.api';
import TextArea from 'antd/lib/input/TextArea';

interface Props {
    parentId?: string;
    readonly?: boolean;
    initialValues?: Partial<Room>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}
const RoomForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);

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
                url: ROOM_CREATE_API,
                method: 'post',
                message: NotificationConstant.DESCRIPTION_CREATE_SUCCESS,
            },
            update: {
                url: `${ROOM_UPDATE_API}/${props.initialValues?.id}`,
                method: 'put',
                message: NotificationConstant.DESCRIPTION_UPDATE_SUCCESS,
            },
        };
        const formValues = formRef.current?.getFieldsValue();
        const urlParam = props.initialValues ? urlParams.update : urlParams.create;

        const response = await requestApi(urlParam.method, urlParam.url, {
            ...formValues,
            houseId: props.parentId,
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
                        label: 'Mã phòng',
                        name: nameof.full<Room>(x => x.roomCode),
                        children: <Input placeholder="Nhập mã phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Số phòng',
                        name: nameof.full<Room>(x => x.number),
                        children: <Input placeholder="Nhập sô phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Diện tích',
                        name: nameof.full<Room>(x => x.acreage),
                        children: <Input placeholder="Nhập diện tích ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Số người ở tối đa',
                        name: nameof.full<Room>(x => x.maxNumberOfPeople),
                        children: <Input placeholder="Nhập số người ở tối đa ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Giá phòng',
                        name: nameof.full<Room>(x => x.price),
                        children: <Input placeholder="Nhập giá phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Cọc trước',
                        name: nameof.full<Room>(x => x.deposit),
                        children: <Input placeholder="Nhập số tiền đặt cọc ..." />,
                    },
                    {
                        label: 'Mô tả',
                        name: nameof.full<Room>(x => x.description),
                        children: <TextArea placeholder="Nhập mô tả ..." />,
                    },
                ]}
                labelAlign="left"
                labelCol={4}
                renderBtnBottom={() => {
                    return (
                        <div className="flex items-center justify-center w-full">
                            {!props.readonly && <ButtonBase title="Lưu" startIcon={faSave} onClick={onSubmit} />}
                            <ButtonBase title="Đóng" startIcon={faClose} variant="danger" onClick={props.onClose} />
                        </div>
                    );
                }}
            />
        </AppModalContainer>
    );
};

export default RoomForm;

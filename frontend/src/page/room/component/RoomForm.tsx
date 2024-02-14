import { faClose, faSave } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import { Method } from 'axios';
import { useRef } from 'react';
import { ButtonBase } from '~/component/Elements/Button/ButtonBase';
import BaseForm, { BaseFormRef } from '~/component/Form/BaseForm';
import { AppModalContainer } from '~/component/Layout/AppModalContainer';
import NotificationConstant from '~/configs/contants';
import { Room } from '~/types/shared';

import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import ImagePickerField from '~/component/Elements/ImagePreview/ImagePickerField';
import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';
import { requestApi } from '~/lib/axios';
import ApiUtil from '~/util/ApiUtil';
import NotifyUtil from '~/util/NotifyUtil';
import { ROOM_CREATE_API, ROOM_UPDATE_API } from '../api/room.api';

interface Props {
    parentId?: string;
    readonly?: boolean;
    initialValues?: Partial<Room>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

const RoomForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);

    const cloneRowData = _.cloneDeep(props.initialValues);

    const onSubmit = async () => {
        const isValidForm = await formRef.current?.isFieldsValidate();

        if (!isValidForm) {
            NotifyUtil.error(NotificationConstant.TITLE, NotificationConstant.ERROR_MESSAGE_UTIL);
            return;
        }

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
        const formBody = {
            ...formValues,
        };

        if (!_.isEmpty(props.initialValues)) {
            const initFiles = cloneRowData?.fileEntryCollection;

            const [listFileRemaining, newFiles] = _.partition(
                formBody.fileEntryCollection,
                (x: any) => !(x instanceof File),
            );

            const listFileRemainingIds = _.map(listFileRemaining, (x: any) => x.id) || [];
            const listDeletedFiles = _.filter(initFiles?.fileEntries, (x: any) => !listFileRemainingIds.includes(x.id));
            const listDeletedFileIds = _.map(listDeletedFiles, (x: any) => x.id);

            _.set(formBody, 'listDeletedFileIds', listDeletedFileIds.toString());
            _.set(formBody, 'fileEntryCollection', newFiles);
        }

        const data = ApiUtil.createFormMultipartForNet({
            ...formBody,
            houseId: props.parentId,
        });

        const urlParam = props.initialValues ? urlParams.update : urlParams.create;
        overlayRef.current?.open();
        const response = await requestApi(urlParam.method, urlParam.url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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

    const initialValues = {
        ...props.initialValues,
        fileEntryCollection: props.initialValues?.fileEntryCollection?.fileEntries.map(file => ({
            id: file.id,
            name: file.fileName,
            status: 'done',
            url: file.url,
        })),
    };

    return (
        <AppModalContainer>
            <BaseForm
                disabled={props.readonly}
                initialValues={initialValues}
                ref={formRef}
                baseFormItem={[
                    {
                        label: 'Mã phòng',
                        name: nameof.full<Room>(x => x.roomCode),
                        children: <Input disabled={props.readonly} placeholder="Nhập mã phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Số phòng',
                        name: nameof.full<Room>(x => x.number),
                        children: <Input disabled={props.readonly} placeholder="Nhập sô phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Diện tích',
                        name: nameof.full<Room>(x => x.acreage),
                        children: <Input disabled={props.readonly} placeholder="Nhập diện tích ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Số người ở tối đa',
                        name: nameof.full<Room>(x => x.maxNumberOfPeople),
                        children: <Input disabled={props.readonly} placeholder="Nhập số người ở tối đa ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Giá phòng',
                        name: nameof.full<Room>(x => x.price),
                        children: <Input disabled={props.readonly} placeholder="Nhập giá phòng ..." />,
                        rules: [{ required: true, message: NotificationConstant.NOT_EMPTY }],
                    },
                    {
                        label: 'Cọc trước',
                        name: nameof.full<Room>(x => x.deposit),
                        children: <Input disabled={props.readonly} placeholder="Nhập số tiền đặt cọc ..." />,
                    },
                    {
                        label: 'Mô tả',
                        name: nameof.full<Room>(x => x.description),
                        children: <TextArea disabled={props.readonly} placeholder="Nhập mô tả ..." />,
                    },
                    {
                        label: 'Hình ảnh',
                        name: nameof.full<Room>(x => x.fileEntryCollection),
                        children: (
                            <ImagePickerField
                                formRef={formRef}
                                initialValue={initialValues.fileEntryCollection}
                                name={nameof.full<Room>(x => x.fileEntryCollection)}
                            />
                        ),
                    },
                ]}
                labelAlign="left"
                labelWidth={150}
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

export default RoomForm;

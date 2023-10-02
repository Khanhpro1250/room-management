import { faClose, faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { Input, Upload, UploadFile, UploadProps } from 'antd';
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
import Overlay, { OverlayRef } from '~/component/Elements/loading/Overlay';
import { useMergeState } from '~/hook/useMergeState';
import ModalBase, { ModalRef } from '~/component/Modal/ModalBase';
import { UPLOAD_FILE_API, UPLOAD_MULTI_FILE_API } from '~/configs';
import _ from 'lodash';
import { RcFile } from 'antd/lib/upload';
import FileUtil from '~/util/FileUtil';
import { UploadOutlined } from '@ant-design/icons';
interface Props {
    parentId?: string;
    readonly?: boolean;
    initialValues?: Partial<Room>;
    onClose?: () => void;
    onSubmitSuccessfully?: () => void;
}

type State = {
    fileUrl: string;
};
const RoomForm: React.FC<Props> = props => {
    const formRef = useRef<BaseFormRef>(null);
    const overlayRef = useRef<OverlayRef>(null);
    const modalRef = useRef<ModalRef>(null);
    const [state, setState] = useMergeState<State>({
        fileUrl: props.initialValues?.fileUrl ?? '',
    });
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

    const handleChange: UploadProps['onChange'] = ({ fileList, file }) => {
        console.log(file);
        if (file.status === 'done') {
            setState({ fileUrl: _.get(file.response, 'fileUrl') });
        }
    };

    const handleCancel = () => modalRef.current?.onClose();

    const onRemove = (file: UploadFile) => {
        const fileUrl = file.url ? file.url : _.get(file.response, 'fileUrl');
        setState({ fileUrl: fileUrl });
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await FileUtil.getBase64(file.originFileObj as RcFile);
        }

        modalRef?.current?.onOpen(
            <img alt="example" style={{ width: '100%' }} src={file.url || (file.preview as string)} />,
            'Xem trước',
            '50%',
            faImage,
        );
    };

    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );

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
                        name: nameof.full<Room>(x => x.fileUrl),
                        children: (
                            <>
                                <Upload
                                    name="file"
                                    action={UPLOAD_MULTI_FILE_API}
                                    accept="image/*"
                                    listType="picture-card"
                                    showUploadList={true}
                                    multiple={true}
                                    // fileList={state.imageList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    onRemove={onRemove}
                                    method="post"
                                >
                                    {/* {state.imageList.length >= 8 ? null : uploadButton} */}
                                    {state.fileUrl ? <img src={state.fileUrl} /> : uploadButton}
                                </Upload>
                                <ModalBase
                                    ref={modalRef}
                                    footer={[
                                        <div key="close" className="w-full flex items-center justify-center">
                                            <ButtonBase
                                                title="Đóng"
                                                startIcon={faClose}
                                                variant="danger"
                                                onClick={handleCancel}
                                            />
                                        </div>,
                                    ]}
                                />
                            </>
                        ),
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

import { UploadOutlined } from '@ant-design/icons';
import { Form, Upload, message } from 'antd';
import { UploadProps } from 'antd/es/upload';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { BaseFormRef } from '~/component/Form/BaseForm';

interface ImagePickerFieldProps {
    name: string;
    initialValue?: any;
    formRef: React.RefObject<BaseFormRef>;
}

const ImagePickerField: React.FC<ImagePickerFieldProps> = ({ name, initialValue, formRef }) => {
    const [fileList, setFileList] = useState<any>(initialValue || []);
    const [listFile, setListFile] = useState<File[]>([]);
    const handleImageChange: UploadProps['onChange'] = ({ fileList }) => {
        const updatedFileList = [...fileList];

        const uploadedFile = updatedFileList.find(file => file.status === 'done');
        if (uploadedFile) {
            message.success(`${uploadedFile.name} file uploaded successfully`);
        }
        setFileList(updatedFileList);
    };

    useEffect(() => {
        initialValue.length > 0 &&
            initialValue.forEach((file: any) => {
                const fileName = file.name;
                const id = file.id;
                fetch(file.url)
                    .then(response => response.blob())
                    .then(blob => {
                        const file = new File([blob], fileName, { type: blob.type });
                        _.set(file, 'id', id);
                        formRef?.current?.setFieldsValue({ [name]: [file] });
                        //@ts-ignore
                        setListFile([...listFile, file]);
                    })
                    .catch(error => {
                        console.error('Error fetching file content:', error);
                    });
            });
    }, [initialValue, name]);

    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
    );

    return (
        <Form.Item
            name={name}
            initialValue={initialValue}
            getValueFromEvent={(e: any) => {
                console.log('e.file', e.file);
                const originalFileList = e.fileList
                    .map((file: any) => {
                        if (!!file.originFileObj) {
                            return file.originFileObj;
                        }
                    })
                    .filter((file: any) => !!file);
                let res = [...originalFileList, ...listFile];
                console.log('e.file', e.file);
                console.log('res', res);
                if (e.file.status === 'removed') {
                    res = res.filter(x => {
                        if (!!e.file.id && x.id === e.file.id) {
                            //@ts-ignore
                            setListFile(listFile.filter(x => x.id !== e.file.id));
                            return false;
                        } else if (x.uid === e.file.uid) {
                            return false;
                        }
                        return true;
                    });
                    formRef?.current?.setFieldsValue({ [name]: res });
                    return res;
                } else {
                    formRef?.current?.setFieldsValue({ [name]: res });
                    return res;
                }
            }}
        >
            <Upload listType="picture-card" fileList={fileList} onChange={handleImageChange} beforeUpload={() => false}>
                {fileList.length < 8 && uploadButton}
            </Upload>
        </Form.Item>
    );
};

export default ImagePickerField;

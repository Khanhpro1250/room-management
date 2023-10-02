import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const MultipleFileUpload = () => {
    const props = {
        name: 'file',

        headers: {
            authorization: 'your-token',
        },
        multiple: true, // Enable multiple file selection
    };

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload Files</Button>
        </Upload>
    );
};

export default MultipleFileUpload;

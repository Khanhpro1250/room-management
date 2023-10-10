import React from 'react';
import { List } from 'antd';

interface Props {
    imageUrls: string[];
}

const ImagePreviewList = (props: Props) => {
    const { imageUrls } = props;
    const transformationOptions = {
        width: 150,
        height: 100,
        crop: 'fill',
    };

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={imageUrls}
            renderItem={(imageUrl: string) => (
                <List.Item>
                    <img
                        src={`${imageUrl}?${new URLSearchParams({
                            width: String(transformationOptions.width),
                            height: String(transformationOptions.height),
                            crop: transformationOptions.crop,
                        }).toString()}`}
                        alt="Cloudinary Image"
                        style={{ width: '100%' }}
                    />
                </List.Item>
            )}
        />
    )
}
export default ImagePreviewList;

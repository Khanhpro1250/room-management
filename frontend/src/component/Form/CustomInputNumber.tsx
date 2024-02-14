import { InputNumber, InputNumberProps } from 'antd';
import React from 'react';

interface CustomInputNumberProps extends InputNumberProps {
    value?: number;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({
    value,
    onChange,
    ...restProps
}: CustomInputNumberProps): React.ReactElement => {
    const handleFormatter = (inputValue: any) => {
        return inputValue ? `${new Intl.NumberFormat('vi-VN').format(inputValue)}` : '';
    };

    const handleParser = (inputValue: string | undefined) => {
        if (inputValue === undefined) {
            return 'null';
        }

        const parsedValue = inputValue.replace(/[^\d]/g, '');
        return isNaN(Number(inputValue.replace(/[^\d]/g, ''))) ? '' : parseInt(parsedValue, 10);
    };

    return (
        <InputNumber
            className="w-full input-number"
            controls={false}
            formatter={handleFormatter}
            parser={handleParser}
            style={{ textAlign: 'right' }}
            defaultValue={value}
            onChange={onChange}
            {...restProps}
        />
    );
};

export default CustomInputNumber;

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import * as React from 'react';
import { BaseIcon } from '~/component/Icon/BaseIcon';

export const variants = {
    primary: 'bg-sky-600 text-white hover:bg-white hover:text-blue-600 hover:border-blue-500',
    inverse: 'bg-slate-600 text-blue-600 hover:bg-white hover:text-slate hover:border-slate-500',
    danger: 'bg-red-800 text-white hover:bg-white hover:text-red-600 hover:border-red-500',
    info: 'bg-gray-400 text-white hover:bg-white hover:text-gray-600 hover:border-gray-500',
    warning: 'bg-amber-500 text-white hover:bg-white hover:border-amber-500 hover:text-amber-600',
    success: 'bg-emerald-800 text-white hover:bg-white hover:text-green-600 hover:border-green-500',
};

export const sizes = {
    xs: 'py-1 px-2 text-xs',
    sm: 'py-1 px-2 text-sm',
    md: 'py-1 px-4 text-md',
    lg: 'py-1.5 px-5 text-[16px]',
    xl: 'py-2 px-6 text-lg',
};

export type IconProps = {
    startIcon?: IconDefinition;
    endIcon?: IconDefinition;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    tooltip?: string;
    title?: string;
    uppercase?: boolean;
} & IconProps;

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ type = 'button', className = '', variant = 'primary', size = 'xs', startIcon, endIcon, ...props }, ref) => {
        const element = (
            <button
                ref={ref}
                type={type}
                className={clsx(
                    'flex justify-center items-center my-0.5',
                    'disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap ',
                    'rounded shadow-md focus:outline-none border border-transparent ',
                    'transition duration-500 ease-in-out mx-1',
                    variants[variant],
                    sizes[size],
                    className,
                )}
                {...props}
            >
                {startIcon && <BaseIcon icon={startIcon} />}
                {props.title && (
                    <span className={clsx('mx-1', props?.uppercase ? 'uppercase' : '')}>{props.title}</span>
                )}
                {endIcon && <BaseIcon icon={endIcon} />}
            </button>
        );

        if (props.tooltip) return <Tooltip title={props.tooltip}>{element}</Tooltip>;

        return element;
    },
);

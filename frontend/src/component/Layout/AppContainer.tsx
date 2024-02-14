import clsx from 'clsx';
import * as React from 'react';
import { CSSProperties } from 'react';
import Loading from '../Elements/loading/Loading';

export interface Props extends React.PropsWithChildren {
    className?: string;
    style?: CSSProperties;
    loading?: boolean;
    title?: React.ReactNode;
}

export interface AppContainerRef {
    mask: (text?: string, className?: string) => void;
    unmask: () => void;
}
export const AppContainer = React.forwardRef<AppContainerRef, Props>(
    ({ className, style, children, loading, title, ...props }, ref) => {
        if (loading) return <Loading />;
        return (
            <div
                className={clsx(
                    'w-full h-screen flex flex-col bg-white relative',
                    'overflow-y-auto overflow-x-hidden ',
                )}
                style={style}
            >
                <div className={clsx('px-[24px] py-[12px] w-full h-full', className)}>
                    {title && <div className="mb-2">{title}</div>}
                    {children}
                </div>
            </div>
        );
    },
);

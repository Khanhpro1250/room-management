import * as React from 'react';
import Loading from '../Elements/loading/Loading';

interface Props extends React.PropsWithChildren<any> {
    className?: string;
    style?: React.CSSProperties;
    loading?: boolean;
}
export const AppModalContainer: React.FC<Props> = (props: Props) => {
    const { loading } = props;
    if (loading) return <Loading />;
    return (
        <div
            style={{
                padding: 10,
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                borderRadius: 5,
                // overflow: 'auto',
                ...(props.style || {}),
            }}
            className={props.className}
        >
            {props.children}
        </div>
    );
};

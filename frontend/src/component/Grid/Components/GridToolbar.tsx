// @flow
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { CSSProperties } from 'react';
import { ButtonBase, sizes } from '~/component/Elements/Button/ButtonBase';

type ToolbarType = {
    rightToolbarStyle?: CSSProperties;
    leftToolbarStyle?: CSSProperties;
};

export type GridToolbarProps = {
    justIcon?: boolean;
    size?: keyof typeof sizes;
    buttonNameCreate?: string;
    buttonNameRefresh?: string;
    hasCreateButton?: boolean;
    hasRefreshButton?: boolean;
    onClickCreateButton?: () => void;
    onClickRefreshButton?: () => void;
    renderAdditionLeftToolBar?: () => JSX.Element;
    renderAdditionRightToolBar?: () => JSX.Element;
} & ToolbarType;

const basicToolbar = (props: GridToolbarProps) => {
    const { hasCreateButton = true, hasRefreshButton = true } = props;
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">{props.renderAdditionLeftToolBar?.()}</div>
            <div className="flex-1 flex items-center justify-end">
                {props.renderAdditionRightToolBar?.()}
                {hasCreateButton && (
                    <ButtonBase
                        size={props.size ?? 'sm'}
                        onClick={() => props.onClickCreateButton?.()}
                        className={'btn-create'}
                        variant={'success'}
                        title={props.justIcon ? undefined : props.buttonNameCreate ?? 'Tạo mới'}
                        startIcon={faPlus}
                    />
                )}
                {/* {hasRefreshButton && (
                    <ButtonBase
                        variant={'primary'}
                        size={props.size ?? 'sm'}
                        title={props.justIcon ? undefined : props.buttonNameRefresh ?? 'Làm mới'}
                        startIcon={faSync}
                        onClick={() => props.onClickRefreshButton?.()}
                    />
                )} */}
            </div>
        </div>
    );
};

export const GridToolbar: React.FC<GridToolbarProps> = props => {
    return <>{basicToolbar(props)}</>;
};

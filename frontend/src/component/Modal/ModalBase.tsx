import { faCircleInfo, faCirclePlus, IconDefinition, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalProps } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './ModalBase.scss';

type Zero = 0;
type ValidNumber = Zero | PositiveInt;
type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Percentage = `${ValidNumber}%` | `${PositiveInt}${ValidNumber}%` | '100%';

export type ModalRef = {
    onClose: () => void;
    onOpen: (
        Component: JSX.Element,
        title: string | React.ReactNode,
        percentWidth?: Percentage,
        icon?: IconDefinition,
    ) => void;
};
interface IState {
    visible: boolean;
    title: string | React.ReactNode;
    children: JSX.Element | null;
    percentWidth: Percentage;
    icon: IconDefinition;
}

interface BaseModalProps extends ModalProps {
    hideTitle?: boolean;
    hideIcon?: boolean;
}

const ModalBase = forwardRef((props: BaseModalProps, ref) => {
    const { hideTitle = false } = props;
    const [state, setState] = useState<IState>({
        visible: false,
        title: '',
        children: null,
        percentWidth: '50%',
        icon: faCircleInfo,
    });

    React.useEffect(() => {
        return () => {
            // console.log('unmount');
        };
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onOpen = (
        Component: JSX.Element,
        title: string | React.ReactNode,
        percentWidth: Percentage = '50%',
        icon: IconDefinition,
    ) => {
        setState(prevState => ({
            ...prevState,
            title,
            visible: true,
            children: Component,
            percentWidth,
            icon,
        }));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onClose = () => {
        setState(prevState => ({ ...prevState, visible: false }));
    };

    useImperativeHandle(
        ref,
        () => ({
            onClose,
            onOpen,
        }),
        [onClose, onOpen],
    );

    const handleCancel = () => setState(prevState => ({ ...prevState, visible: false }));

    if (!state.visible) return null;
    return (
        // @ts-ignore
        <Modal
            wrapClassName={`modal-base ${props.wrapClassName}`}
            visible={state.visible}
            title={
                props.hideTitle ? null : (
                    <div className="flex items-center uppercase">
                        {props.hideIcon ? null : <FontAwesomeIcon icon={state.icon} className="mr-2" />}
                        <div>{state.title}</div>
                    </div>
                )
            }
            closeIcon={<FontAwesomeIcon icon={faClose} />}
            onCancel={handleCancel}
            destroyOnClose
            footer={props.footer ?? null}
            open={props.open}
            width={(window.innerWidth * parseInt(state.percentWidth.replace('%', ''))) / 100}
            {...props}
        >
            {state.children}
        </Modal>
    );
});

export default ModalBase;

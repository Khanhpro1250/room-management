import * as React from 'react';
import { Collapse } from 'antd';

interface Props {
    children: React.ReactNode;
    title: string;
    style?: React.CSSProperties;
    className?: string;
}
const { Panel } = Collapse;

export const Fieldset: React.FC<Props> = ({ children, title, style, className }) => (
    <Collapse className={className} defaultActiveKey={['userInformation']} accordion>
        <Panel header={title} key="userInformation">
            {children}
        </Panel>
    </Collapse>
);

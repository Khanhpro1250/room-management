import * as React from 'react';

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

// add icon to library fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee, faHome, fas } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';

library.add(fas, faCheckSquare, faCoffee, faHome);
library.add(fab, faCheckSquare, faCoffee);

//

interface Props extends FontAwesomeIconProps {
    tooltip?: string;
}

export const BaseIcon: React.FC<Props> = props => {
    const element = <FontAwesomeIcon {...props} />;
    if (props.tooltip) return <Tooltip title={props.tooltip}>{element}</Tooltip>;
    return element;
};

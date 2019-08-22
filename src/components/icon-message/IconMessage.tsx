import * as React from 'react';
import IconMessageProps from './types/IconMessageProps';
import { H5 } from '../styled/typography';
import { IconMessageWrapper } from './styled';

const IconMessage = ( { icon, title, children }: IconMessageProps ) =>
{
    return (
        <IconMessageWrapper>
            { icon }
            <H5>
                { title }
            </H5>
            { children }
        </IconMessageWrapper>
    )
};

export default IconMessage;

import { Notice as StyledNotice } from './styled';
import { Text } from '../styled/typography';
import * as React from 'react';
import { NoticeProps } from './types/notices';

export const Notice = ( { message = '', type }: NoticeProps ) =>
{
    return (
        <StyledNotice type={ type }>
            <Text>
                { message }
            </Text>
        </StyledNotice>
    )
};

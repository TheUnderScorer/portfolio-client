import * as React from 'react';
import ErrorProps from './types/ErrorProps';
import { FaIcon, H5, Text } from '../styled/typography';
import { ErrorMessageWrapper } from './styled';
import { faFrown } from '@fortawesome/free-regular-svg-icons';

const ErrorMessage = ( { message, icon, title }: ErrorProps ) =>
{
    const errorIcon = icon ? icon : <FaIcon icon={ faFrown }/>;

    return (
        <ErrorMessageWrapper>
            { errorIcon }
            <H5>
                { title }
            </H5>
            <Text>
                { message }
            </Text>
        </ErrorMessageWrapper>
    )
};

export default ErrorMessage;

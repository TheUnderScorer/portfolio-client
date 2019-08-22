import { ReactElement } from 'react';
import ReactProps from '../../../types/ReactProps';

export default interface IconMessageProps extends ReactProps
{
    icon: ReactElement;
    title: string | ReactElement;
}

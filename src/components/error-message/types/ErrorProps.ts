import { ReactElement } from 'react';

export default interface ErrorProps
{
    icon?: ReactElement;
    title: string;
    message: string;
}

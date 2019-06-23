import { MouseEventHandler, ReactNode } from 'react';
import ReactProps from '../../../types/ReactProps';

export default interface HorizontalListItemProps extends ReactProps {
    isActive?: boolean;
    title: string;
    icon: ReactNode;
    onButtonClick: MouseEventHandler;
    detailsHeight: string | number;
    marginTop?: number | string;
    loaded?: boolean;
}

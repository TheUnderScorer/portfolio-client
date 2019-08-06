import { ReactNode } from 'react';

export default interface HorizontalListItemData {
    title: string;
    icon: ReactNode;
    content: ReactNode | string;
    detailsHeight: string | number;
    position: 'left' | 'right';
    name: string;
}

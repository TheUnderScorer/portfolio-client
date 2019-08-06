import ReactProps from '../../../types/ReactProps';
import { ReactNode } from 'react';

export default interface SliderSectionProps extends ReactProps
{
    activeSection: number;
    children: ReactNode[];
}

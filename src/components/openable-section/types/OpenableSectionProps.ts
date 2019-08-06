import ReactProps from '../../../types/ReactProps';
import { PositionProperty } from 'csstype';

export default interface OpenableSectionProps extends ReactProps {
    isOpen?: boolean;
    relativeTo: HTMLElement;
    onOpen?: () => any;
    onClose?: () => any;
    className?: string;
    positionAfter?: PositionAfter;
    positionTypeAfter?: PositionProperty;
    zIndex?: number;
    portalTarget?: HTMLElement;
}

export interface PositionAfter {
    top: number | string;
    left: number | string;
}

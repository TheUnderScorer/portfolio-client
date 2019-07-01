import ReactProps from '../../../types/ReactProps';

export default interface OpenableSectionProps extends ReactProps {
    isOpen?: boolean;
    relativeTo?: HTMLElement;
    onOpen?: () => any;
    onClose?: () => any;
    className?: string;
    positionAfter?: PositionAfter;
    zIndex?: number;
}

export interface PositionAfter {
    top: number | string;
    left: number | string;
}

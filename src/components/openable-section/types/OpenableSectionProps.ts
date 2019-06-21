import ReactProps from '../../../types/ReactProps';

export default interface OpenableSectionProps extends ReactProps {
    isOpen?: boolean;
    relativeTo?: HTMLElement;
}

import ReactProps from '../../../types/ReactProps';

export default interface HeroImageProps extends ReactProps {
    srcs: string[];
    activeSrc: number;
}

import { SvgLoaderProps } from './styled';

export default interface LoaderProps {
    width?: number | string;
    height?: number | string;
    svgProps?: SvgLoaderProps;
    active?: boolean;
    asOverlay?: boolean;
}

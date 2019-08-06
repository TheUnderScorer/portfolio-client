import { SvgLoaderProps } from './styled';
import * as React from 'react';

export default interface LoaderProps
{
    width?: number | string;
    height?: number | string;
    svgProps?: SvgLoaderProps;
    active?: boolean;
    asOverlay?: boolean;
    background?: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

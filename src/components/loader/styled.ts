import styled from 'styled-components';
import { LoaderContainerProps, SvgLoaderProps } from './types/styled';

export const LoaderContainer = styled.div<LoaderContainerProps>`
    width: ${ props => props.width };
    height: ${ props => props.height };
    transition: opacity .3s;
    opacity: 0;
    visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${ props => props.asOverlay && `
        position: absolute;
        background: ${ props.theme.palette.background.paper }
        left: 0;
        top: 0;
        z-index: 10;
    ` }
    
    ${ props => props.active && `
        opacity: 1;
        visibility: visible;
    ` }
`;

export const LoaderSvg = styled.svg<SvgLoaderProps>`
    height: ${ props => props.height };
    width: ${ props => props.width };
`;

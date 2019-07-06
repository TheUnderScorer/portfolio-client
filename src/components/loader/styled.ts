import styled from 'styled-components';
import { LoaderContainerProps } from './types/styled';
import colors from '../styled/colors';

export const LoaderContainer = styled.div<LoaderContainerProps>`
    width: ${ props => props.width };
    height: ${ props => props.height };
    transition: opacity .3s;
    opacity: 0;
    visibility: hidden;
    
    ${ props => props.asOverlay && `
        position: absolute;
        background: ${ props.theme.mode === 'black' ? colors.dark : colors.white }
        left: 0;
        top: 0;
        z-index: 10;
    ` }
    
    ${ props => props.active && `
        opacity: 1;
        visibility: visible;
    ` }
`;

export const LoaderSvg = styled.svg`
    height: 100%;
    width: 100%;
`;

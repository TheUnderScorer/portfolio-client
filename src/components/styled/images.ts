import styled from 'styled-components';
import { RoundImageProps } from './types';

export const RoundImage = styled.img<RoundImageProps>`
    width: ${ props => props.width };
    height: ${ props => props.height };
    max-width: ${ props => props.maxWidth ? props.maxWidth : 'none' }
    border-radius: 50%;
`;

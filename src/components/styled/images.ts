import styled from 'styled-components';
import { RoundImageProps } from './types';

export const RoundImage = styled.img<RoundImageProps>`
    width: ${ props => props.width };
    height: ${ props => props.height };
    max-width: ${ ( { maxWidth = 'none' } ) => maxWidth };
    max-height: ${ ( { maxHeight = 'none' } ) => maxHeight };
    border-radius: 50%;
`;

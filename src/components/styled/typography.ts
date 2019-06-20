import styled from 'styled-components';
import colors from './colors';

export const Text = styled.span`
    font-size: 1em;  
    color: ${ props => props.theme.mode === 'black' ? colors.black : colors.white };
`;

export const H1 = styled.h1`
    font-size: 3.5em;
    font-weight: 500;
    color: ${ props => props.theme.mode === 'black' ? colors.black : colors.white };
    display: inline-block;
    margin: 0;
`;

export const H2 = styled.h2`
    margin: 0;
    font-size: 3em;
    font-weight: 500;
    display: inline-block;
    color: ${ props => props.theme.mode === 'black' ? colors.black : colors.white };
`;

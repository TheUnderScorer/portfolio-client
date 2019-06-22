import styled from 'styled-components';
import colors from './colors';

export const Text = styled.span`
    font-size: 1em;  
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

export const H1 = styled.h1`
    font-size: 3.5em;
    font-weight: 500;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
    display: inline-block;
    margin: 0;
`;

export const H2 = styled.h2`
    margin: 0;
    font-size: 3em;
    font-weight: 500;
    display: inline-block;
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.lightDark };
`;

export const SectionTitle = styled( H2 )`
    border-bottom: 6px solid ${ colors.lightBlue };
    color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark }
    padding-bottom: 5px;
    margin-bottom: 40px;
    font-weight: 600;
`;

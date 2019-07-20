import styled from 'styled-components';
import { animated } from 'react-spring';
import colors from '../styled/colors';
import { ContactWrapperProps } from './types/styled';
import { H5 } from '../styled/typography';

export const ContactWrapper = styled( animated.div )<ContactWrapperProps>`
    background: ${ props => props.theme.mode === 'black' ? colors.black : colors.white }
    position: absolute;
    height: 60vh;
    max-height: 700px;
    width: 60vw;
    max-width: 700px;
    top: -78%;
    right: 42%;
    z-index: 14;
    margin-top: 30px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    text-align: center;
    padding: 1.2em;
`;

export const ContactTitle = styled( H5 )`
    border-bottom: 1px solid ${ colors.lightBorder }
    padding-bottom: 1em;
`;

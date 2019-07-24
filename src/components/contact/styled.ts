import styled from 'styled-components';
import { animated } from 'react-spring';
import colors, { getPrimary, getPrimaryVariation } from '../styled/colors';
import { H5, H6 } from '../styled/typography';
import { Button } from '../styled/buttons';
import { IconContainerProps } from './types/styled';
import breakpoints from '../styled/breakpoints';
import Slider from 'react-slick';

export const ContactWrapper = styled( animated.div )`
   position: fixed;
   bottom: 5%;
   right: 3%;
   z-index: 14;
`;

export const IconContainer = styled( Button )<IconContainerProps>`
    background: ${ props => getPrimaryVariation( props.theme.mode ) };
    padding: 10px;
    border-radius: 50%;
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 16;
    
    ${ props => props.active && `
        border-radius: 0;
        box-shadow: none;
    ` }
    
    svg {
        font-size: 2rem;
    }
`;

export const Inner = styled( animated.div )`
    background: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white }
    position: absolute;
    height: 60vh;
    max-height: 500px;
    width: 60vw;
    max-width: 500px;
    bottom: 0;
    right: 0;
    margin-top: 30px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    text-align: center;
    display: flex;
    flex-direction: column;
    
    @media(max-width: ${ breakpoints.tabletSmall }) {
        width: 90vw;
        height: 90vh;
    }
`;

export const ContactTitle = styled( H5 )`
    border-bottom: 1px solid ${ colors.lightBorder }
    padding-bottom: 1em;
    margin-top: 1em;
`;

export const Error = styled.div`
    text-align: center;
    background-color: ${ colors.red };
    padding: 0.5em 0;
   
    span {
        color: ${ colors.white }
    }
`;

export const FormTitleContainer = styled.div`
    border-bottom: none;
    background-color: ${ props => getPrimary( props.theme.mode ) };
    padding: 1rem 0;
    width: 100%;
    color: ${ colors.white };
`;

export const FormTitle = styled( H6 )`
    border-bottom: none;
    color: ${ colors.white };
`;

export const ContactSlider = styled( Slider )`
    flex: 1;
    
    .slick-list, .slick-track, .slick-slide > div {
        height: 100%;
    }
`;

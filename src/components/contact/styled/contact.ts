import styled from 'styled-components';
import { animated } from 'react-spring';
import colors, { getPrimary, getPrimaryVariation } from '../../styled/colors';
import { H5, H6 } from '../../styled/typography';
import { Button } from '../../styled/buttons';
import { IconContainerProps, InnerProps, NoticeProps } from '../types/styled';
import breakpoints from '../../styled/breakpoints';
import { Flex } from '../../styled/wrappers';
import SliderSection from '../../slider-section/SliderSection';

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
    height: 5em;
    width: 5em;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 16;
    
    svg {
        font-size: 2rem;
    }
    
    ${ props => props.active && `
        border-radius: 0;
        box-shadow: none;
        width: 40px;
        height: 40px;
        
        svg {
            font-size: 1.5em;
        }
    ` }
`;

export const Inner = styled.div<InnerProps>`
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
    transition: all .5s;
    transform-origin: right bottom;
    ${ ( { active } ) => `
        opacity: ${ active ? '1' : '0' };
        transform: scale(${ active ? '1' : '0' });
    ` };
    
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

export const Notice = styled.div<NoticeProps>`
    text-align: center;
    padding: 0.5em 0;
       
    span {
        color: ${ colors.white }
    }
    
    background-color: ${ props =>
{

    switch ( props.type ) {

        case 'error':
            return colors.red;

        case 'success':
            return colors.green;

        default:
            return getPrimary( props.theme.mode );
    }

} };
`;

export const FormTitleContainer = styled( Flex ).attrs( {
    justifyContent: 'space-evenly',
    alignItems:     'center'
} )`
    border-bottom: none;
    background-color: ${ props => getPrimary( props.theme.mode ) };
    padding: 1rem;
    width: 100%;
    color: ${ colors.white };
    height: 70px;
`;

export const FormTitle = styled( H6 )`
    border-bottom: none;
    color: ${ colors.white };
    flex: 1;
`;

export const ContactSlider = styled( SliderSection )`
    flex: 1;
`;

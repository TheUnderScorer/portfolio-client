import styled from 'styled-components';
import { animated } from 'react-spring';
import colors from '../../styled/colors';
import { IconContainerProps, InnerProps, NoticeProps } from '../types/styled';
import SliderSection from '../../slider-section/SliderSection';
import { Fab, Grid, Paper } from '@material-ui/core';

export const ContactWrapper = styled( animated.div )`
   position: fixed;
   bottom: 5%;
   right: 3%;
   z-index: 14;
`;

export const IconContainer = styled( Fab ).attrs( {
    color: 'primary'
} )<IconContainerProps>`
    &.MuiButtonBase-root{
        z-index: 16;
        width: 60px;
        height: 60px;
        transition: width .3s, height .3s, font-size .3s, border-radius .3s;
        
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
    }
`;

export const Inner = styled( Paper )<InnerProps>`
    &.MuiPaper-root {
        position: absolute;
        height: 60vh;
        max-height: 600px;
        min-height: 500px;
        width: 60vw;
        max-width: 500px;
        bottom: 0;
        right: 0; 
        margin-top: 30px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        text-align: center;
        display: flex;
        flex-direction: column;
        transition: transform .5s, opacity .5s;
        transform-origin: right bottom;
        ${ ( { active } ) => `
            opacity: ${ active ? '1' : '0' };
            transform: scale(${ active ? '1' : '0' });
        ` };
        
        ${ props => props.theme.breakpoints.down( 'sm' ) } {
            width: 90vw;
            height: 90vh;
        }
    }
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
            return props.theme.palette.primary.main;
    }

} };
`;

export const FormTitleContainer = styled( Grid ).attrs( {
    justify:    'space-between',
    alignItems: 'center',
    container:  true
} )`
    border-bottom: none;
    background-color: ${ props => props.theme.palette.primary.main };
    padding: 0 ${ props => props.theme.spacing( 1 ) };
    width: 100%;
    height: 70px;
`;

export const ContactSlider = styled( SliderSection )`
    flex: 1;
`;

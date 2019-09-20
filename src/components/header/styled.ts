import styled, { keyframes } from 'styled-components';
import { GoBackButtonProps, HeaderProps, NavigationLinkProps, ToggleLinkProps } from './types/styled';
import colors from '../styled/colors';
import breakpoints from '../styled/breakpoints';
import { IconButton, Link } from '@material-ui/core';

const slideAnimation = keyframes`
    from {
        top: -100%;
    }
    
    to {
        top: 0;
    }
`;

export const HeaderWrapper = styled.header<HeaderProps>`
    position: ${ props => props.isFixed ? 'fixed' : 'absolute' };
    width: 100%;
    z-index: 3;
    background-color: ${ props => props.transparent ? 'transparent' : props.theme.palette.background.paper };
    display: flex;
    justify-content: space-between;
    padding: 0 ${ props => props.theme.spacing( 6 ) };
    overflow-x: visible;
    animation: ${ slideAnimation } .3s ease-in-out forwards;
    transition: height .3s;
    
    ${ ( { isFixed } ) => !isFixed && `
        animation: none;
    ` }
    
    ${ ( { isFixed } ) => isFixed && `
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    ` }
    
    ${ props => props.transparent && `
        &, span, small, path, .MuiTypography-root {
            color: ${ props.theme.palette.common.white }
        }
    ` }
    
     .hamburger-inner {
        &, &::before, &::after {
            background-color: ${ props => props.transparent ? colors.white : ( props.theme.palette.type === 'dark' ? props.theme.palette.common.black : props.theme.palette.common.white ) };
        }
    }
    
    @media(max-width: ${ breakpoints.tabletBig }) {
        align-items: center;
        padding: 0 2em;
    }
    
    @media(max-width: ${ breakpoints.tabletBig }) {
        height: 60px;
    
        ${ props => props.isOpen && `
        
            &, span, small, a, path {
                color: ${ props.theme.palette.text.primary };
            }
        
            .navigation {
                opacity: 1;
                visibility: visible;
            }
        ` }
    }
    
    @media(max-width: ${ breakpoints.phoneBig }) {
        padding: 0 1.5em;
    }
`;

export const Navigation = styled.nav`
    padding: 1rem 0;
    
    @media(max-width: ${ breakpoints.tabletBig }){
        top: 0;
        height: 100vh;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        width: 100%;
        /*background: $/{ props => props.theme.mode === 'black' ? colors.dark : colors.white };*/
        transition: all .3s;
        left: 0;
        z-index: 20;
        padding-top: 10em;
        
        ul {
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
        }
        
        li {
            margin-bottom: 2em;
        }
        
        /*span, svg, a {
            color: $/{ props => props.theme.mode === 'black' ? colors.white : colors.dark }
        }*/
    }
`;

export const LogoWrapper = styled.a`
    cursor: pointer;
    display: flex;
    align-items: center;
    z-index: 21;

    img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
    
    @media(max-width: ${ breakpoints.tabletBig }){
        margin-left: -1em;
    }

`;

export const InnerCaption = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

export const NavigationList = styled.ul`
    display: flex;
    list-style: none;
    width: 100%;
    padding: 0;
    justify-content: flex-end;
`;

export const NavigationListItem = styled.li`
    margin: 0 2.2rem;
    display: flex;
    align-items: center;
    position: relative;
`;

export const NavigationLink = styled( Link ).attrs( {
    color:     'textPrimary',
    underline: 'none'
} )<NavigationLinkProps>`
    position: relative;
    font-size: 1.1em;
    cursor: pointer;
    
    &::after {
        content: '';
        width: 100%;
        height: 4px;
        position: absolute;
        background: ${ props => props.theme.palette.primary.main };
        transition: all .3s;
        transform: scale( ${ props => props.active ? '1' : '0' } );
        bottom: -1em;
        left: 0;
    }
    
    &:hover{
        &::after{
            transform: scale(1);
        }
    }
    
`;

export const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 88px;
    justify-content: space-between;
    
    
   /* .theme-mode-switch {
        .mdc-switch:not(.mdc-switch--checked) .mdc-switch__track, .mdc-switch__thumb-underlay::before, .mdc-switch__thumb-underlay::after, .mdc-switch__thumb {
            background-color: $/{ props => getPrimary( props.theme.mode ) } !important;
        }
    }*/
`;

export const MenuActivator = styled( IconButton )`
    font-size: 2em;
    z-index: 21;

    @media(min-width: ${ breakpoints.tabletBig }){
        display: none !important;
    }
    
    &, &:hover {
        background: transparent;
    }
    
    .hamburger-box, .hamburger-inner {
        &, &::before, &::after {
            width: 25px;
        }
    }
    
      .hamburger-inner {
        &, &::before, &::after {
            height: 2px;
        }
    }
`;

export const GoBackButton = styled( IconButton ).attrs( {} )<GoBackButtonProps>`
    &.MuiButtonBase-root {
        transition: all .3s;
        margin-right: 10px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${ props => props.theme.palette.text.primary }
        
        svg {
            font-size: 1rem;
        }
    
        ${ props => !props.isActive ?
    `
            width: 0;
            opacity: 0;
            visibility: hidden;
            margin: 0;
            
            & {
                background: none;
            }
            
            &::before{
                display: none;
            }
        ` :
    `
            width: 30px;
            opacity: 1;
            visibility: visible;
        ` }
    }
`;

export const ToggleLink = styled( Link ).attrs( {
    color:     'textPrimary',
    underline: 'none'
} )<ToggleLinkProps>`
    width: 15px;
`;

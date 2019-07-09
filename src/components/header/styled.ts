import styled, { keyframes } from 'styled-components';
import { GoBackButtonProps, HeaderProps, NavigationLinkProps, ToggleLinkProps } from './types/styled';
import colors, { getPrimary } from '../styled/colors';
import breakpoints from '../styled/breakpoints';
import { IconButton } from '../styled/buttons';
import { A } from '../styled/typography';

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
    background-color: ${ props => props.transparent ? 'transparent' : ( props.theme.mode === 'black' ? colors.dark : colors.lightBg ) };
    display: flex;
    justify-content: space-between;
    padding: 0 6em;
    overflow-x: visible;
    animation: ${ slideAnimation } .3s ease-in-out forwards;
    
    ${ props => !props.isFixed && `
        animation: none;
    ` }
    
    &, span, small, path {
        color: ${ props => props.transparent ? colors.white : ( props.theme.mode === 'black' ? colors.white : colors.dark ) };
    }
    
    @media(max-width: ${ breakpoints.tabletBig }) {
        align-items: center;
        padding: 0 2em;
    }
    
    @media(max-width: ${ breakpoints.tabletSmall }) {
        height: 100px;
    
        ${ props => props.isOpen && `
        
            &, span, small, a, path {
                color: ${ props.theme.mode === 'black' ? colors.white : colors.dark };
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
    
    @media(max-width: ${ breakpoints.tabletSmall }){
        top: 0;
        height: 100vh;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        width: 100%;
        background: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
        transition: all .3s;
        left: 0;
        z-index: 11;
        padding-top: 10em;
        
        ul {
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
        }
        
        li {
            margin-bottom: 2em;
        }
        
        span, svg, a {
            color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark }
        }
    }
`;

export const LogoWrapper = styled.a`
    cursor: pointer;
    display: flex;
    align-items: center;
    z-index: 12;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
    @media(max-width: ${ breakpoints.tabletSmall }){
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
`;

export const NavigationLink = styled.a<NavigationLinkProps>`
    position: relative;
    font-size: 1.1em;
    cursor: pointer;
    
    &::after {
        content: '';
        width: 100%;
        height: 4px;
        position: absolute;
        background: ${ props => getPrimary( props.theme.mode ) };
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
    
    
    .theme-mode-switch {
        .mdc-switch:not(.mdc-switch--checked) .mdc-switch__track, .mdc-switch__thumb-underlay::before, .mdc-switch__thumb-underlay::after, .mdc-switch__thumb {
            background-color: ${ props => getPrimary( props.theme.mode ) } !important;
        }
    }
`;

export const MenuActivator = styled( IconButton )`
    font-size: 2em;
    z-index: 12;

    @media(min-width: ${ parseInt( breakpoints.tabletSmall ) + 1 }px){
        display: none;
    }
`;

export const GoBackButton = styled( IconButton )<GoBackButtonProps>`
    transition: all .3s;
    margin-right: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &, *{
        color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark }
    }
    
    &:hover{
        &, * {
            color: ${ props => props.theme.mode === 'white' ? colors.white : 'inherit' }
        }
    }

    ${ props => !props.isActive ?
    `
        width: 0;
        opacity: 0;
        visibility: hidden;
        
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
`;

export const ToggleLink = styled( A )<ToggleLinkProps>`
    color: ${ props => props.transparent ?
    colors.white :
    props.theme.mode === 'black' ? colors.white : colors.dark
    };
`;

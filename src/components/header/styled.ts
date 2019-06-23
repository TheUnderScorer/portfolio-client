import styled from 'styled-components';
import { HeaderProps, NavigationLinkProps } from './types/styled';
import colors from '../styled/colors';

export const HeaderWrapper = styled.header<HeaderProps>`
    position: absolute;
    width: 100%;
    z-index: 3;
    background-color: ${ props => props.transparent ? 'transparent' : ( props.theme.mode === 'black' ? colors.dark : colors.lightBg ) };
    transition: all .3s;
    display: flex;
    justify-content: space-between;
    padding: 0 6em;
    
    &, span, small {
        color: ${ props => props.transparent ? colors.white : ( props.theme.mode === 'black' ? colors.white : colors.dark ) };
    }
`;

export const Navigation = styled.nav`
    padding: 20px 0;
`;

export const LogoWrapper = styled.a`
    padding: 25px 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
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
    margin: 0 40px;
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
        background: ${ colors.primary };
        transition: all .3s;
        transform: scale( ${ props => props.active ? '1' : '0' } );
        bottom: -15px;
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
            background-color: ${ colors.primary } !important;
        }
    }
`;

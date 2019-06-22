import styled from 'styled-components';
import { HeaderProps, NavigationLinkProps } from './types/styled';
import colors from '../styled/colors';

export const HeaderWrapper = styled.header<HeaderProps>`
    position: absolute;
    width: 100%;
    z-index: 3;
    color: ${ props => props.transparent ? colors.white : ( props.theme.mode === 'black' ? colors.white : colors.dark ) };
    background-color: ${ props => props.transparent ? 'transparent' : ( props.theme.mode === 'black' ? colors.dark : colors.white ) };
    transition: all .3s;
`;

export const Navigation = styled.nav`
    margin-right: 80px;
    padding: 20px 0;
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
        background: ${ colors.lightBlue };
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
`;

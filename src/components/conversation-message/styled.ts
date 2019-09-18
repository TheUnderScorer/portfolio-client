import styled from 'styled-components';
import { MessageItemProps } from './types/styled';
import colors from '../styled/colors';
import { Typography } from '@material-ui/core';

export const MessageItem = styled.li<MessageItemProps>`
    margin-right: ${ props => props.theme.spacing( 0.5 ) };
    padding: 0;

    ${ props => props.isSelf && `
        margin-left: auto;
    ` }
    
    ${ props => props.marginTop && `
        margin-top: 2rem;
    ` }
`;

export const DateHeadline = styled( Typography ).attrs( {
    as: 'time'
} )`
    display: block;
    width: 100%;
    text-align: center;
    margin-top: ${ props => props.theme.spacing( 2 ) };
    position: relative;
    
    span {
        z-index: 2;
        background: ${ props => props.theme.palette.background.default };
        position: relative;
        padding: 0 ${ props => props.theme.spacing( 1 ) };
    }
    
    &::after{
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: ${ colors.lightBorder };
        left: 0;
        content: '';
        z-index: 1;
        bottom: 50%;
    }
`;

export const MessageText = styled( Typography ).attrs( {
    as: 'p'
} )<MessageItemProps>`
    margin: ${ props => props.theme.spacing( 0.2 ) };
    padding: ${ props => props.theme.spacing( 1 ) };
    background: ${ props => props.theme.palette.background.paper };
    position: relative;
    display: inline-block;
    
    ${ props => props.isSelf && `
        &::after {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 10px 0 10px 20px;
            border-color: transparent transparent transparent ${ props.theme.palette.background.paper };
            display: block;
            content: '';
            right: -10px;
            position: absolute;
            top: 10%;
        }
    ` }
    
    ${ props => !props.isSelf && `
         background: ${ props.theme.palette.primary.main }
         color: ${ colors.white }
    ` }
`;

export const MessageDate = styled( Typography ).attrs( {
    as: 'time'
} )`
    font-size: 0.8em;
    display: block;
`;

import styled from 'styled-components';
import { MessageItemProps } from './types/styled';
import { Paragraph, Time } from '../styled/typography';
import colors, { getPrimary } from '../styled/colors';

export const MessageItem = styled.li<MessageItemProps>`
    margin-right: 0.5em;
    padding: 0;

    ${ props => props.isSelf && `
        margin-left: auto;
    ` }
    
    ${ props => props.marginTop && `
        margin-top: 2rem;
    ` }
`;

export const DateHeadline = styled( Time )`
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 2em;
    position: relative;
    
    span {
        z-index: 2;
        background: ${ props => props.theme.mode === 'black' ? colors.black : colors.white };
        position: relative;
        padding: 0 1em;
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

export const MessageText = styled( Paragraph )<MessageItemProps>`
    margin: 0.2em;
    padding: 1rem;
    background: ${ props => props.theme.mode === 'black' ? colors.dark : colors.grey };
    position: relative;
    display: inline-block;
    
    ${ props => props.isSelf && `
        &::after {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 10px 0 10px 20px;
            border-color: transparent transparent transparent ${ props.theme.mode === 'black' ? colors.dark : colors.grey };
            display: block;
            content: '';
            right: -10px;
            position: absolute;
            top: 10%;
        }
    ` }
    
    ${ props => !props.isSelf && `
         background: ${ getPrimary( props.theme.mode ) }
         color: ${ colors.white }
    ` }
`;

export const MessageDate = styled( Time )`
    font-size: 0.8em;
    display: block;
`;

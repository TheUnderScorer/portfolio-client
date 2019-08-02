import styled from 'styled-components';
import { MessageItemProps } from './types/styled';
import { Paragraph, Time } from '../styled/typography';
import colors, { getPrimary } from '../styled/colors';

export const MessageItem = styled.li<MessageItemProps>`
    margin-right: 0.5em;
    margin-bottom: 2rem;
    padding: 0;

    ${ props => props.isSelf && `
        margin-left: auto;
    ` }
`;

export const MessageText = styled( Paragraph )<MessageItemProps>`
    margin: 0.2em;
    padding: 1rem;
    background: ${ props => props.theme.mode === 'black' ? colors.black : colors.grey };
    position: relative;
    
    ${ props => props.isSelf && `
        &::after {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 10px 0 10px 20px;
            border-color: transparent transparent transparent ${ props.theme.mode === 'black' ? colors.black : colors.grey };
            display: block;
            content: '';
            left: 90%;
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
`;

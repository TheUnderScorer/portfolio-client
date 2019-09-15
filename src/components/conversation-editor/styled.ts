import styled from 'styled-components';
import colors from '../styled/colors';
import { MessageSectionProps } from '../conversation/types/styled';
import { CtaButton } from '../styled/buttons';

export const EditorForm = styled.form`
    background-color: ${ props => props.theme.palette.type === 'dark' ? colors.dark : colors.grey };
    padding: ${ props => props.theme.spacing( 1 ) } 0;
    max-height: 6rem;
    height: auto;
`;

export const MessageSection = styled.div<MessageSectionProps>`
    .error {
        margin-left: 1.85em;
    }
    
     .MuiInput-underline {
        &::after, &::before {
            display: none;
        }
    }
    
    .MuiInputBase-root, .MuiInputAdornment-root {
        align-items: flex-end;
        font-size: 1em;
    }
    
    input {
        &::placeholder {
            color: ${ colors.darkerBorder };
        }
    }
    
    svg {
        color: ${ colors.darkerBorder };
        position: relative;
        bottom: 0.2em;
    }
    
    ${ props => props.filled && `
        svg {
            color: ${ props.theme.palette.text.primary };
        }
    ` }
`;

export const SendButton = styled( CtaButton )`
    background-color: ${ colors.green };
    color: ${ colors.white };
`;

export const EditorActions = styled.div``;

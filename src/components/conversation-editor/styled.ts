import styled from 'styled-components';
import { CentredFrom, FormSection } from '../styled/form';
import colors from '../styled/colors';
import { MessageSectionProps } from '../conversation/types/styled';

export const EditorForm = styled( CentredFrom )`
    background-color: ${ colors.grey };
    padding: 1em 0;
    max-height: 7em;
    height: auto;
`;

export const MessageSection = styled( FormSection )<MessageSectionProps>`
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
            color: ${ colors.dark };
        }
    ` }
`;

export const EditorActions = styled.div``;

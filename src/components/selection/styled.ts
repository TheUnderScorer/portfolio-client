import styled from 'styled-components';
import { Button } from '../styled/buttons';
import { Grid } from '@material-ui/core';

export const SelectionContainer = styled( Grid ).attrs( {
    direction: 'column'
} )`
    padding: 1em;
`;

export const SelectionItem = styled( Button )`
    &.MuiButtonBase-root {
        display: flex;
        align-items: center;
        background: transparent;
        box-shadow: none;
        margin-bottom: 1em;
        padding: 0.7em 1em;
        border: none;
        width: 100%;
        border-radius: 0 30px 30px 0;
        line-height: 1.5em;
        text-transform: none;
        
        &:hover {
          background-color: ${ props => props.theme.palette.primary.light };
          
          &::before {
            opacity: 0;
          }  
          
           span, svg, small, svg * {
            color: ${ props => props.theme.palette.primary.contrastText };
            }
        }
        
        svg {
            margin-right: 1rem;
            font-size: 1.5em;
        }
        
        .small-text {
            font-weight: normal;
        }
        
        .text {
            font-weight: bold;
        }
        
        .text, svg, .small-text, svg * {
            color: ${ props => props.theme.palette.text.primary };
        }
        
        .arrow {
            margin-left: auto;
        }
    }
`;

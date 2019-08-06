import styled from 'styled-components';
import { Button } from '../styled/buttons';
import colors, { getPrimaryLight, getPrimaryVariation } from '../styled/colors';
import { Flex } from '../styled/wrappers';

export const SelectionContainer = styled( Flex )`
    padding: 1em;
`;

export const SelectionItem = styled( Button )`
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
    
    &:hover {
      background-color: ${ props => getPrimaryLight( props.theme.mode ) };
      
      &::before {
        opacity: 0;
      }  
      
       span, svg, small, svg * {
        color: ${ props => getPrimaryVariation( props.theme.mode ) };
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
        color: ${ props => props.theme.mode === 'black' ? colors.white : colors.dark };
    }
    
    .arrow {
        margin-left: auto;
    }
`;

import styled from 'styled-components';
import { ButtonProps } from './types';
import { Button as MaterialButton } from '@material-ui/core';

export const Button = styled( MaterialButton )<ButtonProps>`
    &.MuiButton-root{
        width: ${ ( { buttonWidth = 'auto' } ) => buttonWidth };
        height: ${ ( { buttonHeight = 'auto' } ) => buttonHeight };
        
        svg {
            margin-right: ${ props => props.theme.spacing( 0.7 ) }
        }
        
        ${ props => props.flat && `
             box-shadow: none;
        ` }
        
        ${ props => props.iconOnHover && `
            svg, i {
                transition: all .3s;
                opacity: 0;
            }
            
            span  {
                transition: all .3s;
            }
            
            &:not(:hover){
                svg, i {
                    width: 0 !important;
                }
            }
            
            &:hover {
                svg, i {
                    opacity: 1;
                }
            }
        ` }
       
       ${ props => props.isRound && `
            border-radius: 40px;
            padding: 0.7rem 1.7rem;
            overflow: hidden;
       ` }
    }
`;

export const CtaButton = styled( Button )`
    text-transform: uppercase;
    font-size: 1em;
    border-radius: 0;
    padding: 0.7em 1.5em;
    
    &.ripple {
          &.hidden{
            transform: translate3d(0, 0, 0) scale(0);
          }
    }
`;

export const IconButton = styled( Button ).attrs( {
    round: true,
} )`
    padding: 5px 10px;
    border: none;
    border-radius: 50%;
`;

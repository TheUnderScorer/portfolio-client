import styled from 'styled-components';
import colors, { getPrimary } from './colors';
import { ButtonProps } from './types';

export const Button = styled.button<ButtonProps>`
    border-radius: 2px;
    display: inline-block;
    background: ${ props => getPrimary( props.theme.mode ) };
    background-position: center;
    font-size: 0.9em;
    padding: 0.8em 2em;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    outline: none;
    position: relative;
    transition: all .3s;
    border: none;
    text-decoration: none;
    width: ${ ( { buttonWidth = 'auto' } ) => buttonWidth };
    height: ${ ( { buttonHeight = 'auto' } ) => buttonHeight };
    
    &, *, span {
        color: ${ colors.white };
    }
    
    ${ props => props.mode === 'secondary' && `
        background: transparent;
        border: 2px solid ${ getPrimary( props.theme.mode ) };
        
        &:hover {
            background-color: ${ getPrimary( props.theme.mode ) }
        }
    ` }
    
    ${ props => props.flat && `
         box-shadow: none;
    ` }
    
   
    ${ props => props.withIcon && `
        
        span {
            margin: 0 10px;
        }
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
    
    &:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
    
     &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(255, 255, 255, 0.3);
          opacity: 0;
          transition: all .3s;
      }
      
     &:hover:not(:active)::before{
          opacity: 1;
     }
    
   ${ props => props.ripple && `
      position: relative;
      overflow: hidden;
      transform: translate3d(0, 0, 0);
      
      &::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
          background-repeat: no-repeat;
          background-position: 50%;
          transform: scale(10, 10);
          opacity: 0;
          transition: transform .5s, opacity 1s;
      }
      
      &:active::after {
          transform: scale(0, 0);
          opacity: .3;
          transition: 0s;
        }
   ` }
   
   ${ props => props.round && `
        border-radius: 40px;
        padding: 0.7rem 1.7rem;
        overflow: hidden;
   ` }
   
    ${ props => props.cta && `
        text-transform: uppercase;
        font-size: 1em;
        padding: 0.7em 1.5em;
        
        ${ props.round && `
            padding: 1.2rem 2rem;
        ` }
        
        &.ripple {
              &.hidden {
                transform: translate3d(0, 0, 0) scale(0);
              }
        }
   ` }
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

import styled from 'styled-components';
import colors, { getPrimary } from './colors';
import breakpoints from './breakpoints';
import { ButtonProps } from './types';

export const Button = styled.button<ButtonProps>`
    display: inline-block;

    background: ${ props => getPrimary( props.theme.mode ) };
    background-position: center;
    font-size: 0.9em;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 2px 2px 5px 0 rgba(0,0,0,0.75);
    outline: none;
    position: relative;
    transition: all .3s;
    border: 2px solid transparent;
    
    &, * {
        color: ${ colors.white };
    }
    
    ${ props => props.transparent && `
        background: transparent;
        border: 2px solid ${ getPrimary( props.theme.mode ) };
        
        &, * {
          
        }
    ` }
    
    ${ props => props.flat && `
         box-shadow: none;
    ` }
    
    
    ${ props => props.withIcon && `
        svg, i {
            margin-right: 10px;
        }
    ` }
    
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
`;

export const CtaButton = styled( Button )`
    border-radius: 30px;
    padding: 20px 40px;
    text-transform: uppercase;
    font-size: 1.45em;
    
    @media(min-width: ${ breakpoints.tabletSmall }){
        font-size: 1.70em;
    }
    
    @media(min-width: ${ breakpoints.tabletSmall }){
        font-size: 1.10em;
    }
    
    &.ripple {
          &.hidden{
            transform: translate3d(0, 0, 0) scale(0);
          }
    }
`;

export const DarkButton = styled( Button )`
    background: ${ colors.darkBlue };
    color: ${ props => getPrimary( props.theme.mode ) };
    font-weight: 600;
`;

export const RoundDarkButton = styled( DarkButton )`
    border-radius: 20px;
    padding: 10px 25px;
`;

export const RoundButton = styled( Button )`
    border-radius: 20px;
    padding: 10px 25px;
`;


import { createGlobalStyle } from 'styled-components';
import breakpoints from './breakpoints';
import colors, { getPrimary } from './colors';

const GlobalStyle = createGlobalStyle<any>`
    html, body {
        max-height: 100%;
    }

    #root {
         font-family: "Open Sans", serif;
         font-size: 16px;
    
         @media(max-width: ${ breakpoints.tabletBig }){
             font-size: 14px;
         }
    
         @media(max-width: ${ breakpoints.phoneBig }){
             font-size: 14px;
         }
    }
    
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    
    ::-webkit-scrollbar-thumb {
      background: ${ props => props.theme.mode === 'white' ? colors.dark : colors.lightBorder };
      border: none;
      border-radius: 50px;
      transition: all .3s;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: ${ props => getPrimary( props.theme.mode ) };
      opacity: 0.7;
    }
    
    ::-webkit-scrollbar-thumb:active {
      background: ${ props => getPrimary( props.theme.mode ) };
    }
    
    ::-webkit-scrollbar-track {
      &, &:active, &:hover{
          background: ${ props => props.theme.mode === 'black' ? colors.dark : colors.white };
          border: none;
          border-radius: 50px;
      }
    }
    
    ::-webkit-scrollbar-corner {
      background: transparent;
    }
    
    .ReactModal__Overlay{
        z-index: 4;
    }
`;

export default GlobalStyle;

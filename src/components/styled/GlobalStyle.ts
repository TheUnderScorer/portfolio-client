import { createGlobalStyle } from 'styled-components';
import breakpoints from './breakpoints';
import colors from './colors';

const GlobalStyle = createGlobalStyle<any>`
    html, body {
        max-height: 100%;
        overflow: hidden auto;
    }

    #root {
         font-family: "Open Sans", serif;
         font-size: 16px;
    
         @media(max-width: ${ breakpoints.tabletBig }){
             font-size: 14px;
         }
    
         @media(max-width: ${ breakpoints.phoneBig }){
             font-size: 12px;
         }
    }
    
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
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
      background: ${ colors.lightBlue };
    }
    
    ::-webkit-scrollbar-thumb:active {
      background: ${ colors.darkBlue };
    }
    
    ::-webkit-scrollbar-track {
      background: #666666;
      border: none;
      border-radius: 50px;
    }
    
    ::-webkit-scrollbar-track:hover {
      background: #666666;
    }
    
    ::-webkit-scrollbar-track:active {
      background: #333333;
    }
    
    ::-webkit-scrollbar-corner {
      background: transparent;
    }

`;

export default GlobalStyle;

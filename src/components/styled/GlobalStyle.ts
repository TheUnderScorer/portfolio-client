import { createGlobalStyle } from 'styled-components';
import breakpoints from './breakpoints';

const GlobalStyle = createGlobalStyle`
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
`;

export default GlobalStyle;

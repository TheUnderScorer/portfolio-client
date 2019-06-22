import { createGlobalStyle } from 'styled-components';
import breakpoints from './breakpoints';

const GlobalStyle = createGlobalStyle`
    html, body {
        max-height: 100%;
        overflow: auto;
    }

    #root {
         font-family: "Open Sans", serif;
         font-size: 16px;
    
         @media(max-width: ${ breakpoints.tabletBig }){
             font-size: 12px;
         }
    
         @media(max-width: ${ breakpoints.phoneBig }){
             font-size: 10px;
         }
    }
`;

export default GlobalStyle;

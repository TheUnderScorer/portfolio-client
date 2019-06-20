import styled from 'styled-components';
import breakpoints from './breakpoints';

export const Main = styled.main`
    font-family: "Open Sans", serif;
    font-size: 16px;
    
    @media(max-width: ${ breakpoints.tabletBig }){
        font-size: 12px;
    }
    
    @media(max-width: ${ breakpoints.phoneBig }){
        font-size: 10px;
    }
`;

export const FullWidth = styled.div`
    width: 100%;
`;

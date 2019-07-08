import styled from 'styled-components';
import { HomeSectionProps } from './types';
import colors, { getPrimary } from './colors';

export const Main = styled.main`
   
`;

export const FullWidth = styled.div`
    width: 100%;
`;

export const HomeSection = styled.section<HomeSectionProps>`
    position: relative;
    padding: 4rem 2rem;
    width: 100%;
    text-align: ${ props => props.centered ? 'center' : 'left' }
    background-color : ${ props => props.odd ?
    ( props.theme.mode === 'black' ? colors.dark : colors.lightBg ) :
    ( props.theme.mode === 'black' ? colors.black : colors.white )
    }
    
    ${ props => props.colorBackground && `
        padding: 0;
    
        .title-container {
            background-color: ${ getPrimary( props.theme.mode ) }
            padding-top: 4rem;
            padding-bottom: 10rem;
            
            h4{
                color: ${ colors.white };
            }
        }
        
        .section-inner {
            background: transparent;
            position: relative;
            bottom: 8rem;
        }
    ` }
`;

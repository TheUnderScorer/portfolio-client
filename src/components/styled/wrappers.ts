import styled from 'styled-components';
import { HomeSectionProps } from './types';
import colors from './colors';

export const Main = styled.main`
   
`;

export const FullWidth = styled.div`
    width: 100%;
`;

export const HomeSection = styled.section<HomeSectionProps>`
    position: relative;
    padding: 60px 20px;
    width: 100%;
    text-align: ${ props => props.centered ? 'center' : 'left' }
    background-color : ${ props => props.odd ?
    ( props.theme.mode === 'black' ? colors.dark : colors.lightBg ) :
    ( props.theme.mode === 'black' ? colors.black : colors.white )
    }
`;

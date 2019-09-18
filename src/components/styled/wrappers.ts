import styled from 'styled-components';
import { FlexProps, HomeSectionProps } from './types';
import colors from './colors';
import { Box, Grid } from '@material-ui/core';

export const Main = styled.main`
   
`;

export const FullWidth = styled.div`
    width: 100%;
`;

export const HomeSection = styled( Box ).attrs( {
    as: 'section'
} )<HomeSectionProps>`
    position: relative;
    padding: 4rem 2rem;
    width: 100%;
    text-align: ${ props => props.isCentered ? 'center' : 'left' }
    background-color : ${ props => props.odd ?
    ( props.theme.palette.background.paper ) :
    ( props.theme.palette.background.default )
}
    
    .section-inner{
        padding: 0 2rem;
    }
    
    ${ props => props.hasSeparator && `
        border-bottom: 1px solid ${ props.theme.palette.divider }
    ` }
    
    ${ props => props.colorBackground && `
        padding: 0;
        padding-bottom: 4rem;
    
        .title-container {
            background-color: ${ props.theme.palette.primary.main }
            padding-top: 4rem;
            padding-bottom: 12rem;
            position: absolute;
            width: 100%;
            
            h4{
                color: ${ colors.white };
            }
        }
        
        .section-inner {
            background: transparent;
            padding-top: 9em;
        }
    ` }
    
    .overflow-item {
        position: absolute;
        z-index: 12;
        bottom: -20px;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
`;

export const Flex = styled.div<FlexProps>`
    ${ ( { flexDirection = 'row', flexWrap = 'nowrap', justifyContent = 'flex-start', alignItems = 'flex-start', inline = false, flex = 0 } ) => `
        display: ${ inline ? 'inline-flex' : 'flex' }
        flex-direction: ${ flexDirection };
        flex-wrap: ${ flexWrap };
        justify-content: ${ justifyContent };
        align-items: ${ alignItems };
        flex: ${ flex ? flex : 'inherit' };
    ` }
`;

export const ButtonsRow = styled( Grid ).attrs( {
    container: true,
    justify:   'center',
} )`
    position: relative;
    margin-top: ${ props => props.theme.spacing( 1 ) }
    
    button {
        margin: 0 ${ props => props.theme.spacing( 0.5 ) }
    }
`;

import styled from 'styled-components';
import { FlexProps, HomeSectionProps } from './types';
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
    text-align: ${ props => props.isCentered ? 'center' : 'left' }
    background-color : ${ props => props.odd ?
    ( props.theme.mode === 'black' ? colors.dark : colors.lightBg ) :
    ( props.theme.mode === 'black' ? colors.black : colors.white )
}
    
    .section-inner{
        padding: 0 2rem;
    }
    
    ${ props => props.hasSeparator && `
        border-bottom: 1px solid ${ colors.lightBorder }
    ` }
    
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
